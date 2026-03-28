#1.Напишіть програму, яка знаходить середнє значення з трьох чисел, введених користувачем.
num1 = input("Введіть перше число: ")
num2 = input("Введіть друге число: ")
num3 = input("Введіть третє число: ")

if num1.isdigit() and num2.isdigit() and num3.isdigit():
    avg = (int(num1) + int(num2) + int(num3)) / 3
    print(f"Середнє значення: {avg:.5f}")
else:
    print("Ви ввели не число!")


