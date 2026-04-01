import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'
import { PulseLoader } from 'react-spinners'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useGetNotesQuery } from './notesApiSlice'
import useAuth from '../../hooks/useAuth'

const EditNote = () => {
    const { id } = useParams()

    const {username ,isManager, isAdmin } = useAuth()

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        })
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!note || !users?.length) return <PulseLoader color={"#FFF"} />

    if (!isManager && !isAdmin){
        if (note.username !== username) {
            return <p>You do not have permission to edit this note.</p>
        }
    }



    const content = <EditNoteForm note={note} users={users} />
    return content

}
export default EditNote