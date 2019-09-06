import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <h1>Serverless September Twitter Feed</h1>
    <ul>
      <li
        *ngFor="let feed of feeds; let e=even; let o=odd;"
        class="box"
        [ngClass]="{ 'box1': e, 'box2': o }"
        [innerHTML]="feed.Content | twitterCard"
      ></li>
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
        text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
          -1px 1px 0 #000, 1px 1px 0 #000;
        font-size: 3em;
      }
      ul {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .box {
        list-style: none;
        margin: 25px;
        max-width: 500px;
        padding: 10px;
        background: #fff;
        border: solid black;
        border-color: black;
        float: left;
      }
      .box1 {
        border-width: 3px 4px 3px 5px;
        border-radius: 95% 4% 92% 5%/4% 95% 6% 95%;
        transform: rotate(1deg);
      }
      .box2 {
        border-width: 5px 3px 3px 5px;
        border-radius:95% 4% 97% 5%/4% 94% 3% 95%;
        transform: rotate(-1deg);
      }
      a.twitter-handle {
        color: pink;
      }
    `
  ]
})
export class AppComponent {
  title = "serverless-september";
  feeds: {
    Id: number;
    Content: string;
    WhenDate: string;
    Location: string;
  }[] = [
    {
      Id: 12,
      Content:
        "RT @azureadvocates: Serverless inferencing at high-scale with Python and TensorFlow by @nthonyChu: https://t.co/rKntBX8Pcg #ServerlessSept…",
      WhenDate: "2019-09-06T00:00:00.000Z",
      Location: "Washington, DC"
    }
  ];

  async ngOnInit() {
    this.feeds = await (await fetch(
      `https://serverless-september.azurewebsites.net/api/Mentions`
    )).json();
  }
}
