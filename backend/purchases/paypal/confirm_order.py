import os
from typing import List

import requests
from dotenv import load_dotenv

from products.models import BJT, IGBT, MOSFET, Capacitor, Diode, Inductor, Resistor
from products.schema.types import (
    BJTType,
    CapacitorType,
    DiodeType,
    IGBTType,
    InductorType,
    MOSFETType,
    ResistorType,
)
from purchases.models import ProductPurchase, User
from purchases.schema.types import ComponentUnionType, ProductPurchaseType

load_dotenv()


CLIENT_ID = os.environ["CLIENT_ID"]
SECRET = os.environ["SECRET"]

base_url = "https://api-m.sandbox.paypal.com"


components_mapping = {
    "BJT": BJT,
    "MOSFET": MOSFET,
    "IGBT": IGBT,
    "resistor": Resistor,
    "capacitor": Capacitor,
    "inductor": Inductor,
    "diode": Diode,
}


class OrderConfirmationHandler:
    """
    Class with methods responsible for handling all steps in the order confirmation of
    the PayPal API.
    """

    def get_user(self, username: str) -> User:
        user = User.objects.filter(username=username).first()
        if user is None:
            raise Exception(f"No user was found with the username {username}")

        return user

    def send_request(self, token: str) -> List[dict]:
        """
        Gets a user object based on the username.

        Args:
            username (str): User's username.

        Raises:
            Exception: if no user was found

        Returns:
            User: User object corresponding to the username.
        """
        token_payload = {"grant_type": "client_credentials"}
        token_headers = {"Accept": "application/json", "Accept-Language": "en_US"}

        response = requests.get(
            f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{token}",
            auth=(CLIENT_ID, SECRET),
            headers=token_headers,
            data=token_payload,
        )

        if response.status_code != 200:
            raise ("There was an internal problem: ", response)

        response = response.json()
        if response["status"] != "APPROVED":
            raise ("Purchase could not be approved: ", response)

        return response

    def save_purchases(
        self, user: User, items: List[dict]
    ) -> List[ProductPurchaseType]:
        """
        Saves purchased products information in the db using the model ProductPurchaseType.

        Args:
            user (User): User making the purchase.
            items (List[dict]): List of items in the purchase.

        Returns:
            List[ProductPurchaseType]: List of product purchase information.
        """
        components_purchased = []

        for product in items:
            product_type = product["name"].split("-")[0]
            product_id = product["name"].split("-")[1]

            ComponentModel = components_mapping[product_type]
            component = ComponentModel.objects.filter(
                is_active=True, id=product_id
            ).first()

            if component is None:
                raise Exception(f"No {product_type} was found with the ID {product_id}")
            else:
                quantity = product["quantity"]

                ProductPurchase.objects.create(
                    component_type=product_type,
                    component_id=product_id,
                    user=user,
                    price=component.price,
                    quantity=quantity,
                )

                components_purchased.append(
                    ProductPurchaseType(
                        component_node=self.create_component_node(component),
                        quantity=quantity,
                    )
                )

        return components_purchased

    def create_component_node(self, component_object) -> ComponentUnionType:
        """
        Creates an object type based on the given component object.

        Args:
            component_object: Component object to create the node for.

        Returns:
            ComponentUnionType: GraphQL component node.
        """
        component_node = None

        if isinstance(component_object, BJT):
            component_node = BJTType(
                model=component_object.model,
                price=component_object.price,
                package=component_object.package,
                mounting_technology=component_object.mounting_technology,
            )

        if isinstance(component_object, MOSFET):
            component_node = MOSFETType(
                model=component_object.model,
                price=component_object.price,
                package=component_object.package,
                mounting_technology=component_object.mounting_technology,
            )

        if isinstance(component_object, IGBT):
            component_node = IGBTType(
                model=component_object.model,
                price=component_object.price,
                package=component_object.package,
                mounting_technology=component_object.mounting_technology,
            )

        if isinstance(component_object, Resistor):
            component_node = ResistorType(
                resistance=component_object.resistance,
                power=component_object.power,
                price=component_object.price,
                package=component_object.package,
                mounting_technology=component_object.mounting_technology,
            )

        if isinstance(component_object, Inductor):
            component_node = InductorType(
                inductance=component_object.inductance,
                price=component_object.price,
                package=component_object.package,
                mounting_technology=component_object.mounting_technology,
            )

        if isinstance(component_object, Capacitor):
            component_node = CapacitorType(
                capacitance=component_object.capacitance,
                price=component_object.price,
                package=component_object.package,
                mounting_technology=component_object.mounting_technology,
            )

        if isinstance(component_object, Diode):
            component_node = DiodeType(
                model=component_object.model,
                price=component_object.price,
                package=component_object.package,
                mounting_technology=component_object.mounting_technology,
            )
        return component_node
