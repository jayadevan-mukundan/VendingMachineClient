import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-drinklist',
  templateUrl: './drinklist.component.html',
  styleUrls: ['./drinklist.component.css']
})
export class DrinklistComponent implements OnInit {
  items: any[];
  numbers: any[];
  selectedCan: number;
  selectedCanPrice: number;
  infoMessage: string;
  canselectionCompleted: boolean;
  cashCollected: number = 0.0;

  totalCansSold: number = 0;
  totalCashPayment: number = 0;
  totalCashReturned: number = 0;
  totalCardPayment: number = 0;


  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.selectedCan=0;
    this.selectedCanPrice=0;
    this.infoMessage="";
    this.canselectionCompleted= false;
    this.cashCollected = 0.0;
  
    this.totalCansSold = 0;
    this.totalCashPayment = 0;
    this.totalCashReturned = 0;
    this.totalCardPayment = 0;
  
    this.apiService.getItems().subscribe(items => {
      this.items = items;
    });
    this.numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  }

  numberClick(num: number) {
    console.log(num);
    if (this.selectedCan === 0 || this.selectedCan === undefined) {
      this.selectedCan = num;
    }
    else {
      this.selectedCan = this.selectedCan + num;
    }

  }

  onCanNumberEnter() {
    if (this.selectedCan > this.items.length) {
      this.infoMessage = "Please select a number within the available range";
      return;
    }
    var selectedNumber = parseInt(this.selectedCan.toString());
    var item: any = this.items.filter(i => i.number === selectedNumber)[0];

    if (item.remaining == 0) {
      this.infoMessage = `The item you have selected is out of stock..please slect another item`;
      return;
    }
    this.selectedCanPrice = item.price;
    var price = item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', });
    this.infoMessage = `You have selected ${item.name} priced at ${price}, please continue to make payment`;
    this.canselectionCompleted = true;
    return;
  }

  onCancelClick() {
    this.resetAll();
  }

  oncardPayment() {
    if (!this.canselectionCompleted) {
      this.infoMessage = "Please select a can and press enter to continue for payment";
      return;
    }
    var selectedNumber = parseInt(this.selectedCan.toString());
    var item: any = this.items.filter(i => i.number === selectedNumber)[0]
    item.remaining = item.remaining - 1;
    this.totalCansSold += 1; 
    this.totalCardPayment += this.selectedCanPrice; 
    this.savedata();
    this.resetAll();
    this.infoMessage = "Payment success.. please collect your can.";
    return;

  }

  onCashInsert(cashAmount: number) {

    if (!this.canselectionCompleted) {
      this.infoMessage = "Please select a can and press enter to continue for payment";
      return;
    }

    this.cashCollected += cashAmount;
    this.infoMessage = `Cost: ${this.selectedCanPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', })}
                        Paid: ${this.cashCollected.toLocaleString('en-US', { style: 'currency', currency: 'USD', })}
                        Remaining: ${(this.cashCollected - this.selectedCanPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD', })}`;
    if (this.cashCollected >= this.selectedCanPrice) {
      var selectedNumber = parseInt(this.selectedCan.toString());
      var item: any = this.items.filter(i => i.number === selectedNumber)[0]
      item.remaining = item.remaining - 1;
      this.totalCansSold += 1; 
      this.totalCashPayment += this.cashCollected; 
      this.totalCashReturned  +=this.cashCollected - this.selectedCanPrice;
      this.infoMessage += `Payment success..remaining change: ${(this.cashCollected - this.selectedCanPrice)} please collect your can.`;
      this.savedata();
      this.resetAll();
      return;
    }
  }

  resetAll() {
    this.canselectionCompleted = false;
    this.selectedCan = 0;
    //this.infoMessage = "";
    this.cashCollected = 0.0;
  }

  onReStock(){
    this.apiService.restock().subscribe(items => {
      this.ngOnInit();
    });
  }

  savedata(){
    this.apiService.saveItems(this.items).subscribe(items => {
      this.items = items;
    });
  }
}