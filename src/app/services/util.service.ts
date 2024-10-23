import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {MessageComponent} from '../message/message.component';
import * as moment from 'moment';
import {ClipboardService} from 'ngx-clipboard';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public BASE_URL = AppConstants.BASE_URL;

  constructor(private clipboardService: ClipboardService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  /**
   * Group items of an array and created a new array
   * @param dataToGroupOn Actual data to group on
   * @param fieldNameToGroupOn Field which needs to be used from data to group
   * @param fieldNameForGroupName Name of new fields to create group
   * @param fieldNameForChildren Name of children property
   */
 public groupBy(dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren): any {
   return _.chain(dataToGroupOn)
     .groupBy(fieldNameToGroupOn)
     .toPairs()
     .map((currentItem) => {
       return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
     }).value();
  }

  /**
   * This can show alert anywhere in the application
   * @param title Title of the message
   * @param content content of the message
   * @param negative Text of negative button (e.g Cancel)
   * @param positive text of positive button (e.g OK)
   * @private
   */
  public presentAlert(title, content, negative = 'Cancel', positive = 'Ok'): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const dialogRef = this.dialog.open(MessageComponent, {data: {title, content, negative, positive}});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        resolve(result);
      }, error => {
        reject(error);
        console.log('An error occurred in opening dialogue');
      });
    });
  }

  /**
   * Copy to clipboard any text
   * @param text Text which needs to be copied to clipboard
   * @param msg Message which needs to be displayed post copy in toast
   */
  async copyToClipBoard(text: string, msg: string = 'Text copied to clipboard successfully!'): Promise<void> {
    this.clipboardService.copy(text);
    await this.presentSnackBar(msg);
  }

   public b64toBlob(b64Data, contentType= '', sliceSize= 512): Blob {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  const slice = byteCharacters.slice(offset, offset + sliceSize);

  const byteNumbers = new Array(slice.length);
  for (let i = 0; i < slice.length; i++) {
  byteNumbers[i] = slice.charCodeAt(i);
}

  const byteArray = new Uint8Array(byteNumbers);
  byteArrays.push(byteArray);
}

  return new Blob(byteArrays, {type: contentType});
}

  /**
   * Round off a number to n decimal digits
   * @param num Number itself
   * @param places Places e.g; 2 for 11.24
   */
  public roundTo(num: number, places: number): number {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  }

  /**
   * Display a snack bar
   * @param msg Message to be displayed
   * @param duration Duration of message, how long it should be on screen
   */
  public presentSnackBar(msg: string, duration = 5000): void {
    this.snackBar.open(msg, null, {duration});
  }

  /**
   * Convert to title case string e.g; price > Price
   * @param text
   */
  public titleCase(text): string {
    return text.replace(/\w\S*/g,  (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  /**
   * Get date in indian/european format DD-MM-YYYY
   * @param date The date object or ISO string
   */
  public getIndianDate(date): string {
    return moment(date).format('DD-MMM-YYYY');
  }

  /**
   * Get time in HH:mm format e.g; 14:30
   * @param date Date object or iso string
   */
  public getTime(date): string {
    return moment(date).format('HH:mm');
  }

  /**
   * Format Label to include k in thousands
   * @param value Number which needs to be formatted
   */
  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  /**
   * Get date in this format :: 24th May 2018, 02:54 PM
   * @param date Date with time
   */
  public getHumanDateTime(date): string {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  }

  /**
   * This function can be used to restrict an input field of text type to accept only number
   * to be used like this onkeypress="return isNumberKey(event)"
   * @param evt Event of key press
   */
  public isNumberKey(evt): boolean {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode !== 46 && charCode > 31
      && (charCode < 48 || charCode > 57));
  }

  /**
   * Round off a number with Ceil
   * @param num Number which needs to be round off
   */

  ceil(num: number): number {
    return Math.ceil(num);
  }

  /**
   * This function should only be used if you don't want to effect time in a date
   * due to timezone - This will 2021-06-12T17:06:59.999Z be 2021-06-12T17:00:00.000Z
   */
  public noTimeISOString(date: string): any{
    const d = date.split('T')[0];
    return d + 'T00:00.000Z';}

}
