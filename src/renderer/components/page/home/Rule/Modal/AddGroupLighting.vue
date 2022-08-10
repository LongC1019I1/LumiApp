<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-input modal-lg modal-list-group modal-full-height"
    bodyClasses="p-0"
    :backdropClick="false"
    @close="closeModal"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{$t('rule.addGroupLighting')}}</span>
      <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
    </div>
    <div class="filter-header">
      <base-button
        class="confirm-button"
        @click="addGroups"
        :class="{disabled:!selectedGroups.length}"
      >{{$t('scene.addGroup')}}</base-button>
      <div class="search">
        <i class="mdi mdi-magnify"></i>
        <base-input
          id="searchGroup"
          :placeholder=" $t('rule.searchGroup')"
          v-model="textSearch"
          class="mb-0"
        ></base-input>
      </div>
      <div class="filter-group">
        <base-dropdown>
          <i slot="title" class="mdi mdi-filter dropdown-toggle"></i>
          <a class="dropdown-item justify-between" @click="deviceType=false">
            {{ $t('rule.allGroup') }}
            <i v-if="!deviceType" class="mdi mdi-check-bold"></i>
          </a>
          <a
            v-for="type in TYPE_DEVICE_GROUP_LIGHTING"
            :key="type"
            class="dropdown-item justify-between"
            @click="deviceType=type"
          >
            {{ type }}
            <i v-if="deviceType === type" class="mdi mdi-check-bold"></i>
          </a>
        </base-dropdown>
      </div>
    </div>
    <div id="tableGroup">
      <table class="table table-hover m-0">
        <thead>
          <tr>
            <th>
              <i
                class="mdi"
                :class="isSelectedAllGroup?'mdi-checkbox-marked-outline':'mdi-checkbox-blank-outline'"
                @click="selectAllGroup"
              />
            </th>
            <th>{{ $t("rule.groupLighting") }}</th>
            <th>{{ $t("room") }}</th>
            <th>{{ $t("rule.type") }}</th>
            <th>{{ $t("rule.status") }}</th>
          </tr>
        </thead>
        <tbody>
          <add-group-lighting-row
            v-for="(group, index) in listLightingGroup"
            :key="index"
            :group="group"
            :selected="selectedGroups.includes(group.groupid)"
            @selectGroup="selectGroup"
          />
        </tbody>
      </table>
    </div>
  </modal>
</template>

<script>
import AddGroupLightingRow from "../Element/TableRow/AddGroupLighting";
import {
  TYPE_DEVICE_GROUP_LIGHTING,
  GROUP_TYPE
} from "@/plugins/variableConst";
import { getTypeDeviceName } from "@/plugins/helper";
export default {
  name: "modal-add-deivce",
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      textSearch: "",
      deviceType: false,
      selectedGroups: [],
      TYPE_DEVICE_GROUP_LIGHTING
    };
  },
  components: {
    AddGroupLightingRow
  },
  computed: {
    listLightingGroup,
    isSelectedAllGroup
  },
  methods: {
    closeModal,
    selectGroup,
    selectAllGroup,
    addGroups
  }
};

function listLightingGroup() {
  return $getters["HomeConfig/getListGroupByType"](
    GROUP_TYPE.lightingGroup
  ).filter(
    group =>
      (!this.textSearch ||
        group.name.toLowerCase().includes(this.textSearch)) &&
      (!this.deviceType || getTypeDeviceName(group) === this.deviceType) &&
      !($state.RuleManager.out.groups || []).find(
        item => item.groupid === group.groupid
      )
  );
}

function selectGroup(group) {
  console.log(group.groupid, this.selectedGroups);
  let index = this.selectedGroups.findIndex(item => item === group.groupid);
  console.log(index);
  if (index === -1) {
    this.selectedGroups.push(group.groupid);
  } else {
    this.selectedGroups.splice(index, 1);
  }
}

function isSelectedAllGroup() {
  return (
    this.listLightingGroup.length &&
    this.selectedGroups.length === this.listLightingGroup.length
  );
}

function selectAllGroup(group) {
  if (this.isSelectedAllGroup) this.selectedGroups = [];
  else this.selectedGroups = this.listLightingGroup.map(item => item.groupid);
}

function addGroups() {
  $commit("RuleManager/ADD_GROUPS_OUTPUT", this.selectedGroups);
  this.selectedGroups = [];
}

function closeModal() {
  this.selectedGroups = [];
  this.deviceType = "";
  this.textSearch = "";
  this.$emit("closeModal");
}
</script>

<style lang="scss">
</style>
