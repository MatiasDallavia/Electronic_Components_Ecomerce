def check_ampere_notation(field_number):
    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "A"
    else:
        return convert_to_mili(field_number) + "mA"


def check_voltage_notation(field_number):
    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "V"
    else:
        return convert_to_mili(field_number) + "mV"


def check_ohm_notation(field_number):
    if field_number >= 1000:
        field_number = int(field_number) * pow(10, -3)
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "kΩ"

    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "Ω"
    else:
        return convert_to_mili(field_number) + "mΩ"


def check_power_notation(field_number):
    if field_number >= 1000:
        field_number = int(field_number) * pow(10, -3)
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "kW"

    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "W"
    else:
        return convert_to_mili(field_number) + "mW"


def check_power_notation(field_number):
    if field_number >= 1000:
        field_number = int(field_number) * pow(10, -3)
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "kW"

    if field_number >= 1.0:
        if field_number.is_integer():
            field_number = f"{field_number}".split(".")[0]
        else:
            field_number = f"{field_number}"
        return field_number + "W"
    else:
        return convert_to_mili(field_number) + "mW"


def convert_to_mili(field_number):
    return f"{float(field_number) * pow(10, 3)}".split(".")[0]
