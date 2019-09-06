import { Pipe, PipeTransform } from "@angular/core";

const twitterHandleRegex = /(\@[\w]+)/g;
const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

@Pipe({
  name: "twitterCard",
  pure: true
})
export class TwitterCardPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return value
    .replace(urlRegex, '<a href="$1" target="__blanck">$1</a>')
    .replace(twitterHandleRegex, '<a class="twitter-handle" href="https://twitter.com/$1" target="__blanck">$1</a>');
  }
}
