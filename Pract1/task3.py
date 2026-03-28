#1.Реалізуйте програму, яка приймає на вхід рік народження користувача та виводить його вік.
from datetime import date

MIN_YEAR = 1900
year_now = date.today().year

birth_year = input("Введіть рік народження: ")

if birth_year.isdigit():
    year = int(birth_year)

    if year > MIN_YEAR and year <= year_now:
        print(f"Ваш вік: {year_now - year} років.")
    else:
        print("Введіть рік в межах 1900 - 2026")
else:
    print("Рік народження складається лише із цифр!")
