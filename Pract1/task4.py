#1.Напишіть клас "Книга" з властивостями, такими як назва, автор та рік видання. Створіть об'єкт цього класу та виведіть його характеристики.
class Book:
    def __init__(self, title, autor, year):
        self.title = title
        self.autor = autor
        self.year = year

    def description(self):
        print(f'Книга "{self.title}", рік - {self.year}, автор - {self.autor}')

book1 = Book("Boo", "AAAAAAAAAA", 2010)
book1.description()
