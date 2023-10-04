import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

import { PostService } from '../post-service.service';
import { Router } from '@angular/router';

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
  noResultsFound = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchControl = new FormControl();

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this._getPosts();
    this.searchControl.valueChanges.subscribe(() => {
      this.searchPosts();
    });
  }

  ngAfterViewInit() {
    this.paginator.pageSize = this.pageSize;
    this.paginator.page.subscribe(() => {
      this.applyPagination();
    });
  }

  viewDetail(postId: number) {
    this.router.navigate(['/post', postId]);
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.searchPosts();
  }

  _getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.totalItems = this.posts.length;
      this.applyPagination();
    });
  }

  searchPosts() {
    const searchTerm = this.searchControl.value.toLowerCase().trim();
    const filteredPosts = this.posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm)
    );
    this.postView = filteredPosts.slice(0, this.pageSize);
    this.noResultsFound = this.postView.length === 0;
    this.totalItems = filteredPosts.length;
    this.paginator.firstPage();
  }

  applyPagination() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const startIndex = pageIndex * pageSize;

    this.postView = this.posts.slice(startIndex, startIndex + pageSize);
  }
}
