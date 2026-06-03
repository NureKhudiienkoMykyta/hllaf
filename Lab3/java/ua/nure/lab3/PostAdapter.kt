package ua.nure.lab3

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import ua.nure.lab3.data.model.Post

class PostAdapter(
    private var posts: List<Post>,
    private val onPostClick: (Post) -> Unit
) : RecyclerView.Adapter<PostAdapter.PostViewHolder>() {
    override fun onCreateViewHolder(
        parent: ViewGroup, viewType: Int
    ): PostViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_post, parent, false)
        return PostViewHolder(view)
    }

    override fun onBindViewHolder(holder: PostViewHolder, position: Int) {
        val post = posts[position]
        holder.tvTitle.text = post.title
        holder.tvContent.text = post.content
        holder.tvCategory.text = post.category?.name ?: "Без категорії"
        holder.tvAuthor.text = "Автор: ${post.author?.name ?: "Немає автора"}"

        holder.itemView.setOnClickListener { onPostClick(post) }
    }

    override fun getItemCount(): Int {
        return posts.size
    }

    fun updateData(newPosts: List<Post>) {
        this.posts = newPosts
        notifyDataSetChanged()
    }
    class PostViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvTitle: TextView = view.findViewById(R.id.tvPostTitle)
        val tvCategory: TextView = view.findViewById(R.id.tvPostCategory)
        val tvContent: TextView = view.findViewById(R.id.tvPostContent)
        val tvAuthor: TextView = view.findViewById(R.id.tvPostAuthor)
    }
}