function memo() {
  // 投稿ボタンのidを取得している
  const submit = document.getElementById("submit");
  // 投稿ボタンをクリックした場合に実行される処理を定義している
  submit.addEventListener("click", (e) => {
    // フォームで入力された値を取得している
    const formData = new FormData(document.getElementById("form"));
    // サーバーに非同期でHTTPリクエストを行うためのオブジェクトを生成している
    const XHR = new XMLHttpRequest();
    // リクエストを初期化している（どのような処理を行うかを指定している）
    XHR.open("POST", "/posts", true);
    // レスポンスのタイプを指定している（今回はデータ型）
    XHR.responseType = "json";
    // sendで、フォームで入力された値が含まれたリクエストを送信している
    XHR.send(formData);
    // リスエストを受け取ったときの処理を記述している
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // レスポンスとして返却されたデータを取得している（変数itemに代入している）
      const item = XHR.response.post;
      // 描画する親要素であるlist要素を取得している
      const list = document.getElementById("list");
      // メモの入力フォームをリセットするために、リセット対象のcontent要素を取得している
      const formText = document.getElementById("content");
      // メモとして描画する部分のHTMLを定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      // listという要素に対して、その直後にHTMLを追加
      list.insertAdjacentHTML("afterend", HTML);
      // メモの入力フォームに入力されたままの文字をリセットしている
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);