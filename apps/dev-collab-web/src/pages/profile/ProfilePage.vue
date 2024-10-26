<!-- src/App.vue -->
<template>
  <div class="d-flex rounded rounded-5">
    <div class="rounded-start-5 rounded-5 left-panel shadow-lg">
      <div class="text-center bg-red-1 rounded-top-5 py-6">
        <div
          class="bg-color-white d-inline rounded-circle profile-icon m-4 px-6 py-1 fw-bolder border border-5"
        >
          {{ firstEmailCharacter }}
        </div>
      </div>
      <div class="p-4">
        <div class="d-flex align-item-center my-4">
          <div class="me-4 d-flex align-items-center justify-content-center">
            <i class="mdi mdi-account side-icon"></i>
          </div>
          <div class="w-100">
            <div class="d-flex">
              <div class="fs-6">User ID</div>
            </div>
            <div class="fw-bolder red-text-1 fs-5">{{ user_id }}</div>
          </div>
        </div>
        <div class="d-flex align-item-center my-4">
          <div class="me-4 d-flex align-items-center justify-content-center">
            <i class="mdi mdi-email side-icon"></i>
          </div>
          <div class="w-100">
            <div>
              <div class="fs-6">E-Mail</div>
            </div>
            <div class="fw-bolder red-text-1 fs-5 text-break">{{ email }}</div>
          </div>
        </div>
        <div class="d-flex align-item-center my-4">
          <div class="me-4 d-flex align-items-center justify-content-center">
            <i class="mdi mdi-lock side-icon"></i>
          </div>
          <div class="w-100">
            <div class="d-flex">
              <div class="fs-6">Password</div>
              <div class="ms-auto fs-sm">Change</div>
            </div>
            <div class="fw-bolder red-text-1 fs-5">******</div>
          </div>
        </div>
        <hr />
        <div class="d-flex align-item-center my-4">
          <div class="me-4 d-flex align-items-center justify-content-center">
            <i class="mdi mdi-shield side-icon"></i>
          </div>
          <div class="w-100">
            <div>
              <div>Security</div>
            </div>
            <div class="fw-bolder red-text-1 fs-5">Email Sign-On</div>
          </div>
          <div><div class="red-text-1">OFF</div></div>
        </div>
        <!-- <div class="bg-red-1 rounded-4 p-3 white-text-1 text-center my-4">Delete My Account</div> -->
      </div>
    </div>

    <div class="right-panel">
      <div class="mx-5 h-100 rounded-5 px-5 shadow overflow-auto" style="max-height: 720px">
        <div class="d-flex mb-auto pt-4">
          <div class="red-text-1 fs-4 fw-bolder">Team Management</div>
          <button
            class="bg-red-1 white-text-1 px-3 rounded-4 fs-4 ms-auto"
            @click="toggleCreateModal"
          >
            +
          </button>
        </div>
        <hr />
        <div>
          <div
            v-for="user_group in group_list"
            :key="user_group.group_id"
            class="border border-1 px-4 pt-2 rounded-4 cursor-pointer my-2"
            @click="toggleTeamModal(user_group.group.group_id)"
          >
            <div class="d-flex justify-content-center align-items-center">
              <div class="w-100">Team</div>
              <!-- <button
                class="bg-red-1 white-text-1 px-3 rounded-4 fs-sm ms-auto d-flex justify-content-center align-items-center"
              >
                <i class="mdi mdi-logout me-2"></i> Leaves
              </button> -->
            </div>
            <div class="d-flex pb-2 justify-content-center align-items-center">
              <div class="d-flex align-items-center justify-content-center">
                <div class="fs-3 fw-bolder red-text-1">{{ user_group.group.group_name }}</div>
                <!-- Uncomment if needed -->
                <!-- <div class="fs-sm ms-4">[Group Admin]</div> -->
              </div>
              <div class="ms-auto fw-bolder">{{ user_group.group_role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="show_create_modal"
    class="position-fixed vw-100 vh-100 bg-color-gray-50 text-center top-0 left-0 z-999 d-flex shadow-lg"
  >
    <div class="create-team-modal m-auto w-75 h-75 bg-color-white rounded-5">
      <div class="modal-content h-100 w-100">
        <!-- Add your form or other content here -->
        <button
          @click="toggleCreateModal"
          class="position-absolute me-4 mt-4 right-0 top-0 rounded-5 px-2 fs-4 bg-red-1 white-text-1"
        >
          <i class="mdi mdi-close"></i>
        </button>
        <div class="d-flex w-100 h-100">
          <div class="w-50 bg-red-1 white-text-1 h-100 rounded-start-4 d-flex flex-column py-4">
            <div class="py-4 mt-4">
              <div class="d-inline px-6 py-2 large-text bg-color-white red-text-1 rounded-circle">
                <i class="mdi mdi-plus"></i>
              </div>
              <div class="py-2 fs-2 fw-bolder">Create a Team</div>
            </div>

            <div class="my-auto">
              <div>
                <input
                  class="bg-color-white red-text-1 fs-2 px-4 w-75 py-3 rounded-4"
                  placeholder="Team Name"
                  id="group_name_input"
                />
              </div>
              <div class="mt-4">
                <button
                  class="bg-color-white red-text-1 fs-4 w-75 px-5 py-2 rounded-4 shadow"
                  @click="createGroup"
                >
                  <i class="mdi mdi-plus"></i> Create
                </button>
              </div>
            </div>
          </div>
          <div class="w-50 red-text-1 rounded-end-4 d-flex flex-column py-4">
            <div class="py-4 mt-4">
              <div class="d-inline px-6 py-2 large-text rounded-circle bg-red-1 white-text-1">
                <i class="mdi mdi-account-multiple"></i>
              </div>
              <div class="py-2 fs-2 fw-bolder">Join a Team</div>
            </div>

            <div class="my-auto">
              <div>
                <input
                  class="red-text-1 fs-2 px-4 w-75 py-3 rounded-4 red-border-1 border-2 border"
                  placeholder="Invitation Code"
                  id="invitation_code_input"
                />
              </div>
              <div class="mt-4">
                <button
                  class="fs-4 w-75 px-5 py-2 rounded-4 bg-red-1 white-text-1 shadow"
                  @click="joinGroup"
                >
                  <i class="mdi mdi-plus"></i> Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="show_team_modal"
    class="position-fixed vw-100 vh-100 bg-color-gray-50 text-center top-0 left-0 z-999 d-flex shadow-lg"
  >
    <div class="create-team-modal m-auto w-75 h-75 bg-color-white rounded-5">
      <div class="modal-content h-100 w-100">
        <!-- Add your form or other content here -->
        <button
          @click="toggleTeamModal(-1)"
          class="position-absolute me-4 mt-4 right-0 top-0 rounded-5 px-2 fs-4 bg-red-1 white-text-1"
        >
          <i class="mdi mdi-close"></i>
        </button>
        <div class="d-flex w-100 h-100">
          <div class="w-50 bg-red-1 white-text-1 h-100 rounded-start-4 d-flex flex-column py-4">
            <div class="py-4 mt-4">
              <div class="d-inline px-6 py-2 large-text bg-color-white red-text-1 rounded-circle">
                <div class="px-3 d-inline">{{ firstCharOfFocusTeamName }}</div>
              </div>
              <div class="py-2 fs-2 fw-bolder">{{ focusTeamName }}</div>
            </div>

            <div class="my-auto">
              <div class="w-100 d-flex align-items-center justify-content-center">
                <div class="w-75 position-relative">
                  <input
                    class="bg-color-white red-text-1 fs-2 px-4 w-100 py-3 rounded-4 d-block"
                    placeholder="Create Inivatation Code"
                    :value="invitation_code_display"
                    readonly
                  />
                  <button
                    class="position-absolute right-0 top-0 me-4 h-100 d-flex align-items-center justify-content-center gray-text-2 fs-2"
                    @click="RegenerateCode"
                  >
                    <i class="mdi mdi-refresh"></i>
                  </button>
                </div>
              </div>
              <div class="mt-4">
                <button
                  v-if="focusGroupRight === 'ADMIN'"
                  class="bg-color-white red-text-1 fs-4 w-75 px-5 py-2 rounded-4 shadow"
                  @click="deleteGroup"
                >
                  <i class="mdi mdi-trash-can"></i> Delete Team
                </button>

                <button
                  v-if="focusGroupRight === 'MEMBER'"
                  class="bg-color-white red-text-1 fs-4 w-75 px-5 py-2 rounded-4 shadow"
                  @click="leaveGroup"
                >
                  <i class="mdi mdi-logout"></i>
                  Leave Team
                </button>
              </div>
            </div>
          </div>
          <div class="w-50 red-text-1 rounded-end-4 d-flex flex-column py-4">
            <div class="fw-bolder fs-2 text-start px-4">Team Member</div>
            <div class="text-start px-4 w-100">
              <table class="w-100 text-break">
                <thead class="bg-red-1 white-text-1 fw-bolder">
                  <th class="p-2 text-start">User ID</th>
                  <th class="p-2 text-center">Email</th>
                  <th class="p-2 text-center">Roles</th>
                  <th class="p-2 text-center">Action</th>
                </thead>
                <tbody class="gray-text-2">
                  <tr v-for="member in focusGroupMemberList" :key="member.member_id">
                    <td class="red-text-1 fw-bolder">{{ member.user_id }}</td>
                    <td>{{ member.email }}</td>
                    <td>{{ member.group_role }}</td>
                    <td class="d-flex align-items-center justify-content-center p-2">
                      <div
                        v-if="member.user_id !== user_id && focusGroupRight.value === 'ADMIN'"
                        class="bg-red-1 white-text-1 fs-6 px-2 py-1 rounded-4 mx-2"
                        @click="removeMember(member.member_id)"
                      >
                        <i class="mdi mdi-account-minus"></i>
                      </div>
                      <!-- <div class="bg-red-1 white-text-1 fs-6 px-2 py-1 rounded-4 mx-2">
                        <i class="mdi mdi-chevron-up-circle"></i>
                      </div> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupApi from '@/api/group.api'
import LoginApi from '@/api/login.api'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const focusGroup = ref(-1)
    const focusGroupRight = ref('MEMBER')
    const focusTeamName = ref('')
    const firstCharOfFocusTeamName = ref('')
    const show_create_modal = ref(false)
    const show_team_modal = ref(false)
    const group_list = ref([])
    const invitation_code_display = ref('NOT_READY')
    const user_id = ref()
    const email = ref()
    const verify_2fa = ref(false)
    const firstEmailCharacter = ref('U')
    const focusGroupMemberList = ref([])
    const toggleCreateModal = () => {
      show_create_modal.value = !show_create_modal.value
    }
    const getGroupList = async () => {
      try {
        group_list.value = await GroupApi.getGroupList()
        // Fetching the group list
      } catch (error) {
        console.error('Error fetching group list:', error) // Error handling
      }
    }
    const toggleTeamModal = async (group_id) => {
      show_team_modal.value = !show_team_modal.value
      focusGroup.value = group_id

      if (group_id != -1) {
        loadTeamDetail(group_id)
      }
    }
    const loadTeamDetail = async (group_id) => {
      const res = await GroupApi.getCode(group_id)
      if (res.code == null) {
        invitation_code_display.value = 'WAITING FOR GENERATE'
      } else {
        invitation_code_display.value = res.code
      }

      focusTeamName.value = res.group_name
      firstCharOfFocusTeamName.value = focusTeamName.value.toString().substring(0, 1)
      const members = await GroupApi.getMemberList(group_id)

      focusGroupMemberList.value = members

      for (const member of focusGroupMemberList.value) {
        if (member.user_id == user_id.value) focusGroupRight.value = member.group_role
      }
    }
    const createGroup = async () => {
      const create_group_input = document.getElementById('group_name_input')
      const res = await GroupApi.createGroup(create_group_input.value)
      if (res.success == true) {
        location.reload()
      }
    }
    const joinGroup = async () => {
      const invitation_code_input = document.getElementById('invitation_code_input')
      const res = await GroupApi.joinGroup(invitation_code_input.value)
      if (res.success == true) {
        location.reload()
      }
    }
    const RegenerateCode = async () => {
      if (focusGroup.value != -1) {
        const res = await GroupApi.regenereateCode(focusGroup.value)

        if (res.success == true) invitation_code_display.value = res.code
      }
    }
    const getUserInfo = async () => {
      const info = await LoginApi.checkToken(LoginApi.getLocalToken())
      email.value = info.user.email
      user_id.value = info.user.userId
      firstEmailCharacter.value = info.user.email.toString().substring(0, 1)
    }
    const deleteGroup = async () => {
      const res = await GroupApi.deleteGroup(focusGroup.value)
      if (res.success == true) {
        location.reload()
      }
    }
    const leaveGroup = async () => {
      const res = await GroupApi.leaveGroup(focusGroup.value)
      if (res.success == true) {
        location.reload()
      }
    }
    const removeMember = async (member_id) => {
      const res = await GroupApi.removeMember(focusGroup.value, member_id)
      if (res.success == true) {
        loadTeamDetail(focusGroup.value)
      }
    }
    onMounted(() => {
      getGroupList()
      getUserInfo()
    })

    return {
      show_create_modal,
      show_team_modal,
      invitation_code_display,
      toggleCreateModal,
      toggleTeamModal,
      createGroup,
      joinGroup,
      getGroupList,
      RegenerateCode,
      getUserInfo,
      group_list,
      focusGroup,
      user_id,
      loadTeamDetail,
      email,
      verify_2fa,
      firstEmailCharacter,
      focusGroupMemberList,
      focusTeamName,
      firstCharOfFocusTeamName,
      deleteGroup,
      removeMember,
      focusGroupRight,
      leaveGroup
    }
  }
}
</script>

<style lang="scss" scoped>
.z-999 {
  z-index: 9999;
}
.fs-sm {
  font-size: 12px;
}
.left-panel {
  width: 25%;
}
.right-panel {
  width: 75%;
}
.side-icon {
  font-size: 2rem;

  color: $gray-2;
}
.red-text-1 {
  color: $red-1;
}
.large-text {
  font-size: 6rem;
}
.bg-red-1 {
  background-color: $red-1;
}
.bg-color-gray {
  background-color: $gray-2;
}
.bg-color-gray-50 {
  background-color: rgba($gray-2, 0.75); // Assuming $gray-2 is a color variable
}
.red-border-1 {
  border-color: $red-1 !important;
}
.bg-color-white {
  background-color: $vt-c-white;
}
.gray-text-2 {
  color: $gray-2;
}
.white-text-1 {
  color: $vt-c-white;
}
.profile-icon {
  font-size: 8rem;
}
</style>
