<template>
  <card id="groupList" header-classes="p-0" bodyClasses="pt-3">
    <div slot="header" class="row menu-header m-0">
      <div
        v-for="(select, index) in selectGroupTypeOption"
        :key="index"
        @click="
          GROUP_TYPE.lightingGroup === select.value
            ? ''
            : $emit('updateGroupType', select.value)
        "
        class="col-6 c-p"
        :class="{
          active: groupType === select.value,
          disabled: GROUP_TYPE.lightingGroup === select.value,
        }"
      >
        {{ select.label }}
      </div>
    </div>
    <!-- <template #header>
      <v-select
        class="mb-3 header-select"
        :options="selectGroupTypeOption"
        :reduce="label => label.value"
        label="label"
        :value="groupType"
        :clearable="false"
        :searchable="false"
        :placeholder="$t('group.choosseGroupType')"
        @input="(value)=>{$emit('updateGroupType', value)}"
      >
        <template #open-indicator>
          <span v-bind="selectAttributes">
            <i class="mdi mdi-menu-down"></i>
          </span>
        </template>
      </v-select>
    </template> -->
    <div v-for="group in listGroup" :key="group.groupid" class="mb-3 c-p">
      <div
        class="group pr-2"
        :class="{ active: selectedGroup === group.groupid }"
      >
        <div
          class="name text-overflow-hidden pl-3"
          @click="$emit('selectGroup', group.groupid)"
        >
          <span class="text-overflow-hidden">{{ group.name }}</span>
        </div>
        <div class="option">
          <div @click="$emit('showModalGroup', group.groupid, group.name)">
            <div class="tooltip-hover">{{ $t("group.editGroup") }}</div>
            <i class="fa fa-edit" />
          </div>
          <div @click="delGroup(group.groupid)">
            <div class="tooltip-hover">{{ $t("group.deleteGroup") }}</div>
            <i class="fa fa-trash" />
          </div>
        </div>
      </div>
    </div>
    <base-button
      v-if="groupType === GROUP_TYPE.normalGroup"
      class="buttonAddGroup"
      @click="$emit('showModalGroup')"
      >{{ $t("group.addGroup") }}</base-button
    >
  </card>
</template>

<script>
import { GROUP_TYPE } from "@/plugins/variableConst";

export default {
  name: "groupList",
  props: {
    groupType: [Number, Boolean],
    selectedGroup: [String, Boolean],
  },
  data() {
    return {
      selectGroupTypeOption: [
        {
          label: this.$t("group.groupNormal"),
          value: GROUP_TYPE.normalGroup,
        },
        {
          label: this.$t("group.groupLighting"),
          value: GROUP_TYPE.lightingGroup,
        },
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
      GROUP_TYPE,
    };
  },
  computed: {
    listGroup,
  },
  methods: {
    delGroup,
  },
};

function listGroup() {
  return $getters["HomeConfig/getListGroupByType"](this.groupType);
}

async function delGroup(groupid) {
  let confirm = await $alertify.custom({
    title: this.$t("notify.notifyWarninglTitle"),
    text: this.$t("group.confirmDeleteGroup"),
    showCancelButton: true,
    cancelButtonText: this.$t("cancel"),
    confirmButtonText: this.$t("confirm"),
  });
  if (!confirm.isConfirmed) return;
  await $dispatch($api.HomeConfig.deleteGroup, {
    groupid,
  });
  this.$emit("updateGroupType", this.groupType);
}
</script>

<style lang="scss">
#groupList {
  border-radius: 1.25rem;
  .group {
    border-radius: 1.25rem;
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    .name {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .option {
      transition: min-width 0.5s;
      width: 0rem;
      min-width: 0rem;
      display: flex;
      align-items: center;
      overflow: hidden;
      & > div {
        // position: relative;
        min-width: 1.5rem;
        min-height: 1.5rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-color: #4a4a44 !important;
          .tooltip-hover {
            display: block;
          }
        }
        .tooltip-hover {
          clear: both;
          position: absolute;
          top: 2rem;
          right: 5%;
          height: 22px;
          width: max-content;
          padding: 0 5px;
          box-sizing: border-box;
          text-align: center;
          font-size: 11.5px;
          border-radius: 6px;
          line-height: 22px;
          display: none;
          z-index: 1000;
        }
      }
    }
    &:hover {
      .option {
        min-width: 3rem;
      }
    }
  }
  .buttonAddGroup {
    height: 2.5rem;
    width: 100%;
    border-radius: 1.25rem;
  }
}
</style>
