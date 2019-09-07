import { Component } from "@angular/core";
import { ViewEncapsulation } from "@angular/compiler/src/core";

@Component({
  selector: "app-root",
  template: `
    <img class="cloud-image" src="assets/cloud.png" />
    <h1>
      <a href="https://twitter.com/hashtag/ServerlessSeptember" target="__blank">#ServerlessSeptember</a>
      Twitter Feed
    </h1>
    <ul>
      <li *ngFor="let feed of feeds; let e = even; let o = odd">
        <span>From {{ feed.Location || "Twitter" }}</span>
        <main class="box" [ngClass]="{ box1: e, box2: o }" [innerHTML]="feed.Content | twitterCard"></main>
      </li>
    </ul>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }
      h1 {
        -webkit-text-stroke: 1px black;
        color: white;
        text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 6px 7px 0 #fff;
        font-size: 10vw;
        position: relative;
      }
      h1 a {
        color: #d83539;
      }
      img.cloud-image {
        position: absolute;
        top: -60px;
        left: 30%;
        z-index: 0;
        width: 370px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
      }
      li {
        list-style: none;
      }
      li span {
        top: 32px;
        font-size: 18px;
        box-shadow: 3px 3px 0 black;
        position: relative;
        border: 2px solid black;
        z-index: 5;
        padding: 5px;
        background: white;
      }
      .box {
        margin: 25px;
        max-width: 500px;
        padding: 30px 20px;
        background: #fff;
        border: solid black;
        border-color: black;
        transition: transform 0.1s cubic-bezier(0.17, 0.67, 0.79, 0.48);
      }
      .box:hover {
        transform: rotate(0deg);
      }
      .box ::ng-deep a {
        color: #ff5722;
      }
      .box ::ng-deep a.twitter-handle {
        color: #2196f3;
      }
      .box1 {
        border-width: 3px 4px 3px 5px;
        border-radius: 95% 4% 92% 5%/4% 95% 6% 95%;
        transform: rotate(1deg);
        box-shadow: 5px 5px 0px white;
      }
      .box2 {
        border-width: 5px 3px 3px 5px;
        border-radius: 95% 4% 97% 5%/4% 94% 3% 95%;
        transform: rotate(-1deg);
        box-shadow: 5px -5px 0px white;
      }
    `
  ]
})
export class AppComponent {
  feeds: {
    Id: number;
    Content: string;
    WhenDate: string;
    Location: string;
  }[] = [
    {
      Id: 0,
      Content:
        "Loading content, please wait...",
      WhenDate: "2019-09-06T00:00:00.000Z",
      Location: "Paris, FR"
    }
  ];

  async ngOnInit() {
    this.feeds = await (await fetch(`https://serverless-september.azurewebsites.net/api/Mentions`)).json();
  }
}
