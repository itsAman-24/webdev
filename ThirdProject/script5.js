let marks = prompt("Enter yout marks (0-100)");

if(marks>=0 && marks<50) {
    console.log("You got E grade");
}
else if(marks>=50 && marks<60) {
    console.log("You got D grade");
}
else if(marks>=60 && marks<70) {
    console.log("You got C grade");
}
else if(marks>=70 && marks<80) {
    console.log("You got B grade");
}
else {
    console.log("You got A grade");
}
