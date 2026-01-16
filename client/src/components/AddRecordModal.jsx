import React, { useEffect, useState } from 'react'
import { useMemberStore } from '../stores/useMemberStore'
import Select from 'react-select'
import { useAttendanceStore } from '../stores/useAttendanceStore'
function AddRecordModal(props) {
  const { membersList, getMemberList, loading} = useMemberStore()
  const {selectedMembers, setSelectedMembers, addAttendanceRecord, fetchEventAttendance} = useAttendanceStore()
  const [addedMembers, setAddedMembers] = useState([])

  const [options, setOptions] = useState([])
  useEffect(() => {
    async function loadMembers(){
      await getMemberList();
      console.log("list",membersList)
    }
    loadMembers();
  }, [])

  async function addRecord(){
    if (!selectedMembers || selectedMembers.length === 0) return;
    for (const m of selectedMembers){
      await addAttendanceRecord(m.value, props.event_id);
    }
    await fetchEventAttendance(props.event_id);
    setSelectedMembers([]);
    document.getElementById('add_record').hide
  }

  function handleChange(list){
    setSelectedMembers(list)
  }
  return (
    <dialog id="add_record" className="modal">
      <div className='modal-box h-[80vh]'>
        <form method="dialog" className="space-y-4" onSubmit={addRecord}>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
          <label htmlFor="member" className="label">
            <span className="label-text">Select a member</span>
          </label>
          <Select
            isMulti
            name="selectedMembers"
            options={membersList.map(m=>( {value: m.member_id, label : `${m.first_name} ${m.last_name}`}))}
            className="basic-multi-select"
            classNamePrefix="select"
            isLoading = {loading}
            value={selectedMembers}
            onChange={handleChange}
          />
            <div className="modal-action">
            <button type="submit" className="btn btn-primary w-50%" disabled = {loading || selectedMembers==0}>
              {loading ? (
                <span className='loading-spinner'></span>
              ):(
                <p>add record</p>
              )}
            </button>
            <button type="button" className="btn btn-warning" onClick ={()=>setSelectedMembers([])}>
              Clear
            </button>
          </div>
        </form>

      </div>
    </dialog>
  )
}

export default AddRecordModal
