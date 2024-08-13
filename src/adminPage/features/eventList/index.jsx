

function EventList()
{
	return <div>
		<div>
			<button>+ 이벤트 등록</button>
		</div>
		<form>
			<input type="text" />
			<div>
				<fieldset>
					<legend>상태</legend>
					<div>
						<label>
							<input type="checkbox" />
							예정
						</label>
					</div>
				</fieldset>
			</div>
		</form>
	</div>
}

export default EventList;