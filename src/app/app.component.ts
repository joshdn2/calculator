import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {
  currentNumber: string = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitForSecondNumber: boolean = false;

  handleNumber(value: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = value;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = value : this.currentNumber += value;
    }
  } 

  handleOperator(op: string) {
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.calculate();
      this.currentNumber = String(result);
      this.firstOperand = result ?? null;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
  }

  calculate() {
    if (this.firstOperand === null || this.operator === null) return;
    
    const secondOperand = Number(this.currentNumber);
    let result: number;

    switch (this.operator) {
      case '+':
        result = this.firstOperand + secondOperand;
        break;
      case '-':
        result = this.firstOperand - secondOperand;
        break;
      case '*':
        result = this.firstOperand * secondOperand;
        break;
      case '/':
        result = this.firstOperand / secondOperand;
        break;
      default:
        return;
    }

    this.currentNumber = String(result);
    this.firstOperand = null;
    this.operator = null;
    return result;
  }

  clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}