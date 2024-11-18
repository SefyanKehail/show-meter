import {Component, Input, OnInit} from '@angular/core';
import {UserProfileDto} from "../../../shared/dto/user-profile.dto";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @Input()
  userProfileDto: UserProfileDto | undefined;

  navList = ["Home", "Genre", "Movies", "TV Shows", "Trending"];

  ngOnInit(): void {

  }
}
