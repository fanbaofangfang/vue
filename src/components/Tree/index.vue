<template>
  <li>
    <div @click="toggle">
      {{model.title}}
      <span v-if="isFolder">{{open ? '-':"+"}}</span>
    </div>
    <ul>
      <li v-show="open" v-if="isFolder"></li>
    </ul>
  </li>
</template>
<script>
export default {};
</script>