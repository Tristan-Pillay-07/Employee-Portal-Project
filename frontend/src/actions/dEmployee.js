import api from "./api"

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : 'DELETE',
    FETCH_ALL : 'FETCH_ALL'
}


export const fetchAll = () => dispatch => {
    api.dEmployee().fetchAll().
        then(response => {
            const flatData = response.data.flat(); 

            dispatch({
                type : ACTION_TYPES.FETCH_ALL,
                payload : flatData
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    api.dEmployee().create(data)
        .then(res => {
            dispatch({
                type : ACTION_TYPES.CREATE,
                payload : res.data
            })
            onSuccess();
        }
    )
    .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    api.dEmployee().update(id, data)
        .then(res => {
            dispatch({
                type : ACTION_TYPES.UPDATE,
                payload : {id, ...data}
            })
            onSuccess();
        }
    )
    .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.dEmployee().delete(id)
        .then(res => {
            dispatch({
                type : ACTION_TYPES.DELETE,
                payload : id
            })
            onSuccess();
        }
    )
        .catch(err => console.log(err))
}