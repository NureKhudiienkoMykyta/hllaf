package ua.nure.pract3

import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.Spinner
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {
    private lateinit var spinner: Spinner
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: HolidayAdapter

    private val holidaysByMonth = mapOf(
        "Січень" to listOf("Новий рік", "Різдво Христове"),
        "Лютий" to listOf("День святого Валентина", "Масляна"),
        "Березень" to listOf("Міжнародний жіночий день", "День весняного рівнодення"),
        "Квітень" to listOf("Великдень", "День довкілля"),
        "Травень" to listOf("День праці", "День перемоги"),
        "Червень" to listOf("День захисту дітей", "Трійця"),
        "Липень" to listOf("День Конституції України", "День української державності"),
        "Серпень" to listOf("День Незалежності України", "День Державного Прапора України"),
        "Вересень" to listOf("День знань", "День вчителя"),
        "Жовтень" to listOf("День захисників і захисниць України", "День козацтва"),
        "Листопад" to listOf("День Гідності та Свободи", "День пам’яті жертв Голодомору"),
        "Грудень" to listOf("День Збройних Сил України", "Різдво Христове")
    )


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        spinner = findViewById(R.id.spinner)
        recyclerView = findViewById(R.id.recyclerViewHolidays)

        createRecycleView()

        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                val selectedMonth: String = spinner.selectedItem.toString()
                val holidays: List<String> = holidaysByMonth[selectedMonth] ?: emptyList()

                adapter.updateData(holidays)
            }

            override fun onNothingSelected(p0: AdapterView<*>?) {

            }

        }
    }


    fun createRecycleView() {
        recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = HolidayAdapter(emptyList())
        recyclerView.adapter = adapter
    }
}