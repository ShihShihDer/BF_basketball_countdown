
// 定義一個 timer 变量來跟踪倒數計時器
let timer;

// DOM 元素的引用
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const customForm = document.getElementById('custom');

// 設定定時器
function startTimer(seconds) {
    // 清除之前的定時器
    clearInterval(timer);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);  // 初始時間顯示
    displayEndTime(then);      // 顯示結束時間

    timer = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // 如果時間到了，清除定時器
        if (secondsLeft < 0) {
            clearInterval(timer);
            return;
        }

        // 否則，更新時間
        displayTimeLeft(secondsLeft);
    }, 1000);
}

// 顯示剩餘時間
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timeLeft.textContent = display;
    document.title = display;  // 更新標簽頁標題
}

// 顯示結束時間
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;  // 轉換為 12 小時制
    const minutes = end.getMinutes();
    endTime.textContent = `返回於 ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// 監聽點擊事件
buttons.forEach(button => button.addEventListener('click', function () {
    startTimer(parseInt(this.dataset.time));
}));

// 監聽自定義表單提交事件
customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    startTimer(mins * 60);
    this.reset();
});
