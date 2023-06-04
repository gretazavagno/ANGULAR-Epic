import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/service/posts.service';

@Component({
    selector: 'app-active-posts',
    templateUrl: './active-posts.component.html',
    styleUrls: ['./active-posts.component.scss'],
})
export class ActivePostsComponent implements OnInit {

    posts!: Post[];

    constructor(private postsSrv: PostsService) {
        this.postsSrv.getPosts().then((data) => {
            this.posts = data;
            console.log(this.posts);
        });
    }

    ngOnInit(): void {}
}
