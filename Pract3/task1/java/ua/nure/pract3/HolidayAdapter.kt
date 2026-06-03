package ua.nure.pract3

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class HolidayAdapter(private var holidays: List<String>) :
    RecyclerView.Adapter<HolidayAdapter.HolidayViewHolder>() {

    class HolidayViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvName: TextView = view.findViewById(R.id.tvHolidayName)
    }

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): HolidayViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_holiday, parent, false)
        return HolidayViewHolder(view)
    }

    override fun onBindViewHolder(holder: HolidayViewHolder, position: Int) {
        val holiday = holidays[position]
        holder.tvName.text = holiday
    }

    override fun getItemCount(): Int {
       return holidays.size
    }

    fun updateData(newHolidays: List<String>) {
        this.holidays = newHolidays
        notifyDataSetChanged()
    }

}