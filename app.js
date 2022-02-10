const input = document.querySelector('#input');
const okayButton = document.querySelector('.ok');
const insertion = document.querySelector('.insertion');
const quickSortDiv = document.querySelector('.quick-sort');
const output = document.querySelector('.display-result');
const body = document.getElementsByTagName('body')[0];
const calc = document.querySelector('.calculator');
const buttons = document.querySelectorAll('.button'); 
const acButton = document.querySelector('.ac'); 
const countingButton = document.querySelector('.counting'); 
const heapButton = document.querySelector('.heap'); 
const sortingInfoDiv = document.querySelector('.sorting-info'); 
const bestCase = document.querySelector('.best-case'); 
const averageCase = document.querySelector('.average-case'); 
const worstCase = document.querySelector('.worst-case'); 
const asc = document.querySelector('.asc'); 
const dsc = document.querySelector('.dsc'); 

let array = [];
let sortType = '';

asc.addEventListener('click', function() {
    sortType = 'asc';
    asc.style.background = "green";
    asc.style.color = "white";
});
dsc.addEventListener('click', function() {
    sortType = 'dsc';
    dsc.style.background = "green";
    dsc.style.color = "white";
});


acButton.addEventListener('click', function() {
    array = [];
    output.innerHTML = "";
    sortingInfoDiv.innerHTML = "";
    bestCase.innerHTML = "";
    averageCase.innerHTML = "";
    worstCase.innerHTML = "";
})

//Taking Input as Array
input.addEventListener('keyup', function(event) {
    if(event.keyCode === 13) {
        if(input.value != "") {
            array.push(parseInt(input.value));
            input.value = "";
            output.innerHTML = array.join(" ");
            body.style.background = "white";
            input.placeholder = "Enter Another Number";
            calc.style.background = "";
            buttons.forEach(function(button) {
                button.style.color = "";
                button.style.background = "";
            })
        } else {
            calc.style.background = "red";
            nullInsertionPrevent();
            buttons.forEach(function(button) {
                button.style.color = "white";
                button.style.background = "black";
            })
        }
    }
});


//Call Insertion sort
insertion.addEventListener('click', function() {
console.log('asc');
    if(sortType == 'asc') {
 
        if(array.length === 0) {
            sortingInfoDiv.innerHTML = "Please Insert a Number and then try again.";
        } else {
            let sortedArray = insertionSort([...array]);
    
            let newArray = sortedArray.join(" ");
        
            output.innerHTML = "Ascending : " + newArray;
            sortingInfoDiv.innerHTML = "Insertion";
            bestCase.innerHTML = "Ω(n)";
            averageCase.innerHTML = "θ(n^2)";
            worstCase.innerHTML = "O(n^2)";
        }
    }


})

//Insertion Sort
function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;

}

//Quick Sort
quickSortDiv.addEventListener('click', function() {
    if(sortType == 'asc') {
        if(array.length === 0) {
            sortingInfoDiv.innerHTML = "Please Insert a Number and then try again.";
        } else {
            let length = array.length - 1;
            let sortedArray = quickSort(0, length);
            let newArray = array.join(" ");
            output.innerHTML = "Ascending : " + newArray;
            sortingInfoDiv.innerHTML = "Quick Sort";
            bestCase.innerHTML = "Ω(n log(n))";
            averageCase.innerHTML = "θ(n log(n))";
            worstCase.innerHTML = "O(n^2)";
        }
    }


});

function Partition(p, r) {
    let i = p - 1;
    for (let j = p; j < r; j++) {
        if(array[j] <= array[r]) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    let tempTwo = array[i + 1];
    array[i + 1] = array[r];
    array[r] = tempTwo;
    return i + 1;
}

function quickSort(p, r) {
    if(p < r) {
        let q = Partition(p,r);
        quickSort(p, q-1);
        quickSort(q + 1, r);
    }
}


countingButton.addEventListener('click', function() {
    if(sortType == 'asc') {

        if(array.length === 0) {
            sortingInfoDiv.innerHTML = "Please Insert a Number and then try again.";
        } else {
            let min = Math.min(...array);
            let max = Math.max(...array);
            let sortedArray = countingSort(array, min, max);
        
            let newArray = sortedArray.join(" ");
        
            output.innerHTML = "Ascending : " + newArray;
            sortingInfoDiv.innerHTML = "Counting Sort";
            bestCase.innerHTML = "Ω(n+k)";
            averageCase.innerHTML = "Ω(n+k)";
            worstCase.innerHTML = "Ω(n+k)";
        }
    }


})


//Counting Sort
const countingSort = (array, min, max) => {
    const count = {};
    // First populate the count object
    for (let i = min; i <= max; i++) {
        count[i] = 0;
    }
    for (let i = 0; i < array.length; i++) {
        count[array[i]] += 1;
    }
 
    const sortedArr = [];
    for (let i = min; i <= max; i++) {
        while (count[i] > 0) {
            sortedArr.push(i);
            count[i]--;
        }
    }
    return sortedArr;
};

//Heap Sort
heapButton.addEventListener('click', function() {
    if(sortType == 'asc') {
        if(array.length === 0) {
            sortingInfoDiv.innerHTML = "Please Insert a Number and then try again.";
        } else{
            let sortedArray = heapsort([...array]);
            let newArray = sortedArray.join(" ");
        
            output.innerHTML = "Ascending : " + newArray;
            sortingInfoDiv.innerHTML = "Heap Sort";
            bestCase.innerHTML = "Ω(n log(n))";
            averageCase.innerHTML = "θ(n log(n))";
            worstCase.innerHTML = "O(n log(n))";
        }
    }
})

//Heap Sort
function heapsort(arr) {
    const a = [...arr];
    let l = a.length;
  
    const heapify = (a, i) => {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let max = i;
      if (left < l && a[left] > a[max]) max = left;
      if (right < l && a[right] > a[max]) max = right;
      if (max !== i) {
        [a[max], a[i]] = [a[i], a[max]];
        heapify(a, max);
      }
    };
  
    for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
    for (i = a.length - 1; i > 0; i--) {
      [a[0], a[i]] = [a[i], a[0]];
      l--;
      heapify(a, 0);
    }
    return a;
  };

//Sweet Alerts Functions
function nullInsertionPrevent() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Sorry, you cannot insert Null Value'
      })
}



//DESCEDNING SORT
//Call Insertion sort
insertion.addEventListener('click', function() {

    if(sortType == 'dsc') {
        if(array.length === 0) {
            sortingInfoDiv.innerHTML = "Please Insert a Number and then try again.";
        } else {
            let sortedArray = insertionSortDsc([...array]);
    
            let newArray = sortedArray.join(" ");
        
            output.innerHTML = "Descending : " + newArray;
            sortingInfoDiv.innerHTML = "Insertion";
            bestCase.innerHTML = "Ω(n)";
            averageCase.innerHTML = "θ(n^2)";
            worstCase.innerHTML = "O(n^2)";
        }
    }


})

//Insertion Sort
function insertionSortDsc(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            let current = inputArr[i];
            let j = i-1; 
            while ((j > -1) && (current > inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;

}

//Quick Sort
//Quick Sort
quickSortDiv.addEventListener('click', function() {
    if(sortType == 'dsc') {
        if(array.length === 0) {
            sortingInfoDiv.innerHTML = "Please Insert a Number and then try again.";
        } else {
            let length = array.length - 1;
            let sortedArray = quickSortDsc(0, length);
            let newArray = array.join(" ");
            output.innerHTML = "Descending : " + newArray;
            sortingInfoDiv.innerHTML = "Quick Sort";
            bestCase.innerHTML = "Ω(n log(n))";
            averageCase.innerHTML = "θ(n log(n))";
            worstCase.innerHTML = "O(n^2)";
        }
    }


});

function PartitionDsc(p, r) {
    let i = p - 1;
    for (let j = p; j < r; j++) {
        if(array[j] >= array[r]) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    let tempTwo = array[i + 1];
    array[i + 1] = array[r];
    array[r] = tempTwo;
    return i + 1;
}

function quickSortDsc(p, r) {
    if(p < r) {
        let q = PartitionDsc(p,r);
        quickSortDsc(p, q-1);
        quickSortDsc(q + 1, r);
    }
}


//Heap Sort 
//Heap Sort
heapButton.addEventListener('click', function() {
    if(sortType == 'asc') {
        if(array.length === 0) {
            sortingInfoDiv.innerHTML = "Please Insert a Number and then try again.";
        } else{
            let sortedArray = heapsort([...array]);
            let newArray = sortedArray.join(" ");
        
            output.innerHTML = "Descending : " + newArray;
            sortingInfoDiv.innerHTML = "Heap Sort";
            bestCase.innerHTML = "Ω(n log(n))";
            averageCase.innerHTML = "θ(n log(n))";
            worstCase.innerHTML = "O(n log(n))";
        }
    }
})

//Heap Sort

//Heap Sort
heapButton.addEventListener('click', function() {
    if(sortType == 'dsc') {
        if(array.length === 0) {
            sortingInfoDiv.innerHTML = "Please Insert a Number and then try again.";
        } else{
            let sortedArray = heapsortDsc([...array]);
            let newArray = sortedArray.join(" ");
        
            output.innerHTML = "Descending : " + newArray;
            sortingInfoDiv.innerHTML = "Heap Sort";
            bestCase.innerHTML = "Ω(n log(n))";
            averageCase.innerHTML = "θ(n log(n))";
            worstCase.innerHTML = "O(n log(n))";
        }
    }
})

function heapsortDsc(arr) {
    const a = [...arr];
    let l = a.length;
  
    const heapifyDsc = (a, i) => {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let max = i;
      if (left < l && a[left] < a[max]) max = left;
      if (right < l && a[right] < a[max]) max = right;
      if (max !== i) {
        [a[max], a[i]] = [a[i], a[max]];
        heapifyDsc(a, max);
      }
    };
  
    for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapifyDsc(a, i);
    for (i = a.length - 1; i > 0; i--) {
      [a[0], a[i]] = [a[i], a[0]];
      l--;
      heapifyDsc(a, 0);
    }
    return a;
  };


  //Counting Sort
  countingButton.addEventListener('click', function() {
    if(sortType == 'dsc') {

        if(array.length === 0) {
            sortingInfoDiv.innerHTML = "Please Insert a Number and then try again.";
        } else {
            let min = Math.min(...array);
            let max = Math.max(...array);
            let sortedArray = countingSortDsc(array, min, max);
        
            let reverserSort = sortedArray.sort(function(a, b){return b - a});

            let newArray = sortedArray.join(" ");
        
            output.innerHTML = "Descending : " + newArray;
            sortingInfoDiv.innerHTML = "Counting Sort";
            bestCase.innerHTML = "Ω(n+k)";
            averageCase.innerHTML = "Ω(n+k)";
            worstCase.innerHTML = "Ω(n+k)";
        }
    }


})

//Counting Sort
const countingSortDsc = (array, min, max) => {
    const count = {};
    // First populate the count object
    for (let i = min; i <= max; i++) {
        count[i] = 0;
    }
    for (let i = 0; i < array.length; i++) {
        count[array[i]] += 1;
    }
 
    const sortedArr = [];
    for (let i = min; i <= max; i++) {
        while (count[i] > 0) {
            sortedArr.push(i);
            count[i]--;
        }
    }
    return sortedArr;
};