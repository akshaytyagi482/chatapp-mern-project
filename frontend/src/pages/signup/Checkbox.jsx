const GenderCheckbox = ({handlecheckbox,selectedgender}) => {
     	return (
     		<div className='flex'>
     			<div className='form-control'>
     				<label className={`label gap-2 cursor-pointer ${selectedgender == "male" ? "selected": ""}`}>
     					<span className='label-text'>Male</span>
     					<input type='checkbox' className='checkbox border-slate-900' 
                        checked={selectedgender == "male"}
                        onChange={()=>handlecheckbox("male")}
                        />
     				</label>
     			</div>
     			<div className='form-control'>
     				<label className={`label gap-2 cursor-pointer ${selectedgender == "femmale" ? "selected": ""}`}>
     					<span className='label-text'>Female</span>
     					<input type='checkbox' className='checkbox border-slate-900' 
                        checked={selectedgender == "female"}
                        onChange={()=>handlecheckbox("female")}
                        />
     				</label>
     			</div>
     		</div>
     	);
     };
     export default GenderCheckbox;