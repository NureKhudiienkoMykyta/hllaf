from django.urls import path
from . import views

urlpatterns = [
    path("", views.student_list, name="student-list"),
    path("<int:student_id>/", views.get_student, name="profile"),
    path('<int:student_id>/edit/', views.edit_student, name="edit"),
    path('import-csv/', views.csv_import, name="import-csv"),
    path('import-api/', views.import_api, name="import-api"),
    path('get-pdf/', views.get_pdf, name='get-pdf')
]