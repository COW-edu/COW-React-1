function DownFooterDetail(props) {
  return(
    <div>
      <strong className=" m-2">{props.main}</strong>
      <span className=" font-normal text-gray-600">{props.sub}</span>
    </div>
  )
}
export default DownFooterDetail;