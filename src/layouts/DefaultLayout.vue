<script setup>
import '@/styles/default-layout.css'
import { useRouter } from 'vue-router'

const router = useRouter()

function goOut() {
    router.push({ name: 'Login' })
}

</script>


<template>
    <div class="app-layout">
        <aside class="sidebar">
            <div class="logo" aria-label="Logo do app">
                <span class="logo-mark" aria-hidden="true"></span>
            </div>



            <div class="sidebar-middle"></div>

            <div class="sidebar-bottom">
                <button @click="goOut" class="add-btn exit-btn" aria-label="Sair do aplicativo">
                    <span class="exit-icon" aria-hidden="true">⇦</span>
                </button>
            </div>

        </aside>

        <main class="content">
            <router-view />
        </main>
    </div>
</template>
