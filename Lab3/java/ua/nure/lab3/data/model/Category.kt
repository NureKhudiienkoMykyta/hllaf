package ua.nure.lab3.data.model

data class Category(
    val id: Int,
    val name: String
)

data class CategoryResponse(
    val categories: List<Category>
)