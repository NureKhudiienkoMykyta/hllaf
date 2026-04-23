from django.http import HttpResponse, JsonResponse, FileResponse
from django.db.models import Avg
from .forms import EditForm
from .models import Student
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from django.conf import settings
import os
from reportlab.pdfbase.ttfonts import TTFont
import csv
import json
import io
from datetime import datetime

# Create your views here.

def student_list(request):
    students_list = Student.objects.prefetch_related("mark_set").all()
    return render(request, "studentlist/list.html", {"student_list": students_list})


def get_student(request, student_id):
    student = get_object_or_404(Student, pk=student_id)
    return render(request, "studentlist/profile.html", {"student": student})


def edit_student(request, student_id):
    student = get_object_or_404(Student, pk=student_id)

    if request.method == "POST":
        form = EditForm(request.POST, request.FILES, instance=student)

        if form.is_valid():
            form.save()
            return redirect('profile', student.id)
    else:
        form = EditForm(instance=student)

    context = {
        "student": student, "form": form
    }

    return render(request, "studentlist/editForm.html", context)


def csv_import(request):
    if request.method == "POST":
        try:
            file = request.FILES["file"]

            if not file.name.endswith(".csv"):
                return HttpResponse("Не то")

            decoded_file = file.read().decode("utf-8").splitlines()

            reader = csv.DictReader(decoded_file)

            data_list = list(reader)

            create_students(data_list)

            return redirect("student-list")
        except KeyError:
            return HttpResponse("Помилка! Немає файлу!")
        except Exception as e:
            return HttpResponse(str(e))

    return HttpResponse("ОПА!")

@csrf_exempt
def import_api(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            create_students(data)

            return JsonResponse({"message": "Students created"}, status=200)
        except json.JSONDecodeError:
            return JsonResponse(data={"error": "Не правильний json!"}, status=400)
        except Exception as e:
            return JsonResponse(data={"error": str(e)}, status=400)

    return JsonResponse(data={"message": "Помилка!"}, status=400)


def create_students(data_list):
    students = []
    for row in data_list:
        students.append(Student(**row))

    Student.objects.bulk_create(students)


def get_pdf(request):
    students = Student.objects.annotate(
        avg_mark=Avg("mark__mark")
    )

    buffer = io.BytesIO()
    font_path = os.path.join(settings.BASE_DIR, "fonts/DejaVuSans.ttf")
    pdfmetrics.registerFont(TTFont("DejaVu", font_path))

    p = canvas.Canvas(buffer)
    p.setFont("DejaVu", 12)
    p.drawString(100, 800, "Звіт про успішність студентів")

    y = 760
    p.drawString(50, y, "ПІБ")
    p.drawString(300, y, "Група")
    p.drawString(450, y, "Середній бал")

    y -= 20
    p.line(50, y, 550, y)

    y -= 20

    for student in students:
        full_name = str(student)
        group_name = student.group.name if student.group else "-"
        avg_mark = student.avg_mark if student.avg_mark is not None else 0

        p.drawString(50, y, full_name)
        p.drawString(300, y, group_name)
        p.drawString(450, y, str(round(avg_mark, 2)))

        y -= 20

        if y < 50:
            p.showPage()
            p.setFont("DejaVu", 12)
            y = 800

    p.save()

    buffer.seek(0)
    now = datetime.now()
    file_name = f"Звіт про успішність студентів на {now.strftime("%Y-%m-%d %H:%M")}.pdf"
    return FileResponse(buffer, as_attachment=True, filename=file_name)