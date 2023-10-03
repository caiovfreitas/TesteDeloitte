import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PostService } from '../post-service.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  postView: any[] = [];
  pageSize = 5;
  totalItems = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postService: PostService) {
    this.paginator = {} as MatPaginator;
  }

  ngOnInit(): void {
    this._getPosts();
  }

  ngAfterViewInit() {
    this.paginator.pageSize = this.pageSize;
    this.paginator.page.subscribe(() => {
      this.applyPagination();
    });
  }

  viewDetail() {}

  _getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;

      this.applyPagination();
    });
  }

  applyPagination() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const startIndex = pageIndex * pageSize;

    this.totalItems = this.posts.length;
    console.log(this.totalItems);

    this.postView = this.posts.slice(startIndex, startIndex + pageSize);
  }
}
