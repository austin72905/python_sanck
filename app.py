from flask import Flask,render_template
app=Flask(__name__)  #__name__代表目前執行的模組

@app.route("/") #函式的裝飾，已函式回基礎，提供附加的功能  (寫在函式上)
def Home():
  return render_template("index.html")

@app.route("/test")
def Test():
  return "this is test"
if __name__=="__main__":  #如果以主程式執行
  app.run()  #立刻啟動伺服器
