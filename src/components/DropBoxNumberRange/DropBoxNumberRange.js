export default function DropBoxNumberRange( props ) {
    console.log("RENDER SELECT LIST");
    let options = [];
    for (let i = props.min; i <= props.max; i++) {
      options.push(<option value={i} key={i}>{i}</option>);
    }

    return (
      <>
        <label htmlFor="questions">{props.title}</label>
        <select name="questions" key="questions">
          {options}
        </select>
      </>
    );
  }