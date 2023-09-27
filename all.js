let regionSearch = document.querySelector(".regionSearch");
let ticketCardArea = document.querySelector(".ticketCard-area");
let searchResult = document.querySelector("#searchResult-text");
let btn = document.querySelector(".btn");

axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json"
  )
  .then(function (response) {
    console.log(response.data);

    // 由API資料建立卡片資訊
    function init() {
      let addCard = "";
      let selectNum = 0;
      response.data.forEach((item) => {
        // 取得API資料
        let area = item.area;
        let description = item.description;
        let group = item.group;
        let id = item.id;
        let imgUrl = item.imgUrl;
        let name = item.name;
        let price = item.price;
        let rate = item.rate;

        addCard += `
          <li class="ticketCard">
          <div class="ticketCard-img">
              <a href="#">
              <img src="${imgUrl}" alt="">
              </a>
              <div class="ticketCard-region">${area}</div>
              <div class="ticketCard-rank">${rate}</div>
          </div>
          <div class="ticketCard-content">
              <div>
              <h3>
                  <a href="#" class="ticketCard-name">${name}</a>
              </h3>
              <p class="ticketCard-description">
                  ${description}
              </p>
              </div>
              <div class="ticketCard-info">
              <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${group} </span> 組
              </p>
              <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${price}</span>
              </p>
              </div>
          </div>
          </li>
        `;
        selectNum += 1;
      });
      ticketCardArea.innerHTML = addCard;
      searchResult.innerHTML = `本次搜尋共 ${selectNum} 筆資料`;
    }
    init();

    // 新增套票
    btn.addEventListener("click", function (e) {
      let area = document.querySelector("#ticketRegion");
      let description = document.querySelector("#ticketDescription");
      let group = document.querySelector("#ticketNum");
      let imgUrl = document.querySelector("#ticketImgUrl-message");
      let name = document.querySelector("#ticketName");
      let price = document.querySelector("#ticketPrice");
      let rate = document.querySelector("#ticketRate");

      let obj = {};
      obj.area = area.value;
      obj.description = description.value;
      obj.group = group.value;
      obj.id = response.data.length;
      obj.imgUrl = imgUrl.value;
      obj.name = name.value;
      obj.price = price.value;
      obj.rate = rate.value;

      response.data.push(obj);
      init();
      regionSearch.value = "全部地區";
      alert("套票新增成功！");

      // 送出後清空資料
      area.value = "";
      description.value = "";
      group.value = "";
      imgUrl.value = "";
      name.value = "";
      price.value = "";
      rate.value = "";
    });

    // 篩選地區
    regionSearch.addEventListener("change", function (e) {
      let selectCard = "";
      let selectNum = 0;

      response.data.forEach((item) => {
        let area = item.area;
        let description = item.description;
        let group = item.group;
        let id = item.id;
        let imgUrl = item.imgUrl;
        let name = item.name;
        let price = item.price;
        let rate = item.rate;
        let card = `
          <li class="ticketCard">
          <div class="ticketCard-img">
              <a href="#">
              <img src="${imgUrl}" alt="">
              </a>
              <div class="ticketCard-region">${area}</div>
              <div class="ticketCard-rank">${rate}</div>
          </div>
          <div class="ticketCard-content">
              <div>
              <h3>
                  <a href="#" class="ticketCard-name">${name}</a>
              </h3>
              <p class="ticketCard-description">
                  ${description}
              </p>
              </div>
              <div class="ticketCard-info">
              <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${group} </span> 組
              </p>
              <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${price}</span>
              </p>
              </div>
          </div>
          </li>
        `;

        if (e.target.value === area) {
          selectCard += card;
          selectNum += 1;
        } else if (e.target.value === "全部地區") {
          selectCard += card;
          selectNum = response.data.length;
        }
        ticketCardArea.innerHTML = selectCard;
        searchResult.innerHTML = `本次搜尋共 ${selectNum} 筆資料`;
      });
    });
  });
