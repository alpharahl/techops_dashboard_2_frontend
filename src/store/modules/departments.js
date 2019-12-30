
export default {
  namespaced: true,
  state: {
    departments: []
  },

  actions: {
  },

  mutations: {
    importDepartments(data){
      console.log(data)
      this.state.departments = data;
    }
  }
}