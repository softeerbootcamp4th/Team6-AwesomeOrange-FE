function EventDrawMetadataItem({ grade, count, prizeInfo }) {
  return (
    <>
      <p className="font-medium">{grade}등</p>
      <p>{count}명</p>
      <p className="justify-self-start">{prizeInfo}</p>
    </>
  );
}

export default EventDrawMetadataItem;
