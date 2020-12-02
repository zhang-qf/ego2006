<template>
  <div>
    <proHead></proHead>
    <proList></proList>
    <proFenye></proFenye>
     <proAdd></proAdd>
     <proBj/>
  </div>
</template>

<script>
import proList from './proList'
import proHead from './proHead'
import proFenye from './proFenye'
import proAdd from './proAdd'
import proBj from './proBj'
export default {
  name: "Product",
  components:{
    proList,
    proHead,
    proFenye,
    proAdd,
    proBj
  }
};
</script>

<style>
</style>