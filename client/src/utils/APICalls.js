/*
Exports functions for CRUD requests
*/
const APIURL = process.env.REACT_APP_API_URL;

// POST SINGLE TASK
export async function taskPost(data) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  };
  const response = await fetch(APIURL, requestOptions)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      //console.log(error);
      return { error: error };
    });

  return response;
}

// GET LIST OF TASKS
export async function tasksFetch(status = null) {
  let params = "";
  if (status) params += "status=" + status;

  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(APIURL + "?" + params, requestOptions)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      //console.log(error);
      return { error: error };
    });

  return response;
}

// PUT - BULK UPDATE STATUS
export async function bulkTasksUpdate(data) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  };
  const response = await fetch(APIURL, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        const results = tasksFetch().then((result) => {
          return result;
        });
        return results;
      } else {
        throw new Error("something is wrong");
      }
    })
    .catch((error) => {
      return { error: error };
    });

  return response;
}

// PUT - SINGLE TASK UPDATE
export async function taskUpdate(id, data) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  };
  const response = await fetch(APIURL + "/" + id, requestOptions)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      //console.log(error);
      return { error: error };
    });

  return response;
}

// DELETE - ARCHIVES SINGLE TASK
export async function taskDelete(id) {
  const requestOptions = {
    method: "DELETE",
  };
  const response = await fetch(APIURL + "/" + id, requestOptions)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      //console.log(error);
      return { error: error };
    });

  return response;
}
