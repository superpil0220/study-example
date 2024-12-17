import './App.css'

function App() {

  // 함수 정의
  function onDemo() {
    console.log("Superpil!");
  }

  return (
      <>
        {/*React 다양한 함수 실행법, 저는 조금 쉽지 않았어요.*/}

        {/*
          Case1 함수 정의
        */}
        <button onClick={onDemo}>Click1</button>

        {/*Case1과 동일한 코드1*/}
        <button onClick={function onNewDemo() {console.log("Superpil!")}}>Click2</button>

        {/*Case1과 동일한 코드2*/}
        <button onClick={() => console.log("Superpil!")}>Click3</button>

        {/*
          Case2 함수 실행 결과
          랜더링 시점에 onDemo함수가 바로 실행되서 값이 반환된다. 최초 한번 실행 후 더이상 동작하지 않음
        */}
        <button onClick={onDemo()}>Click4</button>

        {/*Case2와 동일한 코드*/}
        <button onClick={console.log("superpil!")}>Click5</button>

        {/*
          Case3 화살표 함수에서 함수 정의
          함수 정의를 리턴하기 때문에 실행되지 않는다.
        */}
        <button onClick={() => onDemo}>Click6</button>

        {/*
          Case4 화살표 함수에서 함수 실행
          화살표 함수에서 onDemo함수가 실행된다.
        */}
        <button onClick={() => onDemo()}>Click7</button>
      </>

  )
}

export default App
