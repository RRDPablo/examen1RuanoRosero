import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
  posts:any[]=[];

  constructor(private postsService: PostsService){}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((data:any[])=>{
      this.posts=data;
    })
  }
}
