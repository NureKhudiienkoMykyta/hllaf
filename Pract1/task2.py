#1.Напишіть програму, яка знаходить середнє значення з трьох чисел, введених користувачем.
count = int(input("Введіть кількість чисел: "))

sum = 0

for i in range(count):
    num = float(input(f"Введіть число номер {i + 1}: "))

    sum += num

avg = sum / count
print(f"Середнє значення: {avg}")