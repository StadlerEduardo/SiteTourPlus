// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
    })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    })
})

// OpenStreetMap initialization (alternativa gratuita)
function initMap() {
    const mapElement = document.getElementById("map")

    if (!mapElement) return

    try {
        // Verificar se Leaflet está disponível
        if (typeof L === "undefined") {
            showMapFallback()
            return
        }

        const location = [-23.5505, -46.6333] // São Paulo coordinates [lat, lng]

        const map = L.map("map").setView(location, 15)

        // Adicionar tiles do OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        // Adicionar marcador
        const marker = L.marker(location).addTo(map)

        // Popup do marcador
        marker
            .bindPopup(`
      <div style="padding: 10px; color: #2c3e50;">
        <h3 style="margin: 0 0 10px 0; color: #3498db;">TourPlus</h3>
        <p style="margin: 0;">📍 Rua das Viagens, 123 - Centro</p>
        <p style="margin: 5px 0 0 0;">📞 (11) 9999-9999</p>
      </div>
    `)
            .openPopup()
    } catch (error) {
        console.error("Erro ao carregar mapa:", error)
        showMapFallback()
    }
}

function showMapFallback() {
    const mapElement = document.getElementById("map")
    if (mapElement) {
        mapElement.innerHTML = `
      <div class="map-fallback">
        <div>
          <i class="fas fa-map-marker-alt"></i>
          <h3>TourPlus</h3>
          <p>Rua das Viagens, 123 - Centro</p>
          <p>São Paulo, SP</p>
          <p>(11) 9999-9999</p>
          <button onclick="openGoogleMaps()" style="
            background: linear-gradient(135deg, #3498db, #2ecc71);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 15px;
          ">Ver no Google Maps</button>
        </div>
      </div>
    `
    }
}

function openGoogleMaps() {
    window.open("https://maps.google.com/?q=-23.5505,-46.6333", "_blank")
}

// Service Cards Modal
const serviceCards = document.querySelectorAll(".service-card")
const modal = document.getElementById("serviceModal")
const modalContent = document.getElementById("modalContent")
const closeModal = document.querySelector(".close")

const serviceInfo = {
    tourism: {
        title: "Turismo e Novas Cidades",
        content: `
            <h2>Explore Novos Destinos</h2>
            <p>Nossos tours para novas cidades oferecem experiências únicas e inesquecíveis:</p>
            <ul>
                <li><strong>Tours Guiados:</strong> Guias especializados com conhecimento local profundo</li>
                <li><strong>Roteiros Personalizados:</strong> Adaptamos o passeio aos seus interesses</li>
                <li><strong>Transporte Confortável:</strong> Veículos modernos e climatizados</li>
                <li><strong>Grupos Pequenos:</strong> Máximo de 15 pessoas para experiência mais íntima</li>
                <li><strong>Pontos Turísticos:</strong> Visitamos os principais atrativos e lugares escondidos</li>
                <li><strong>Gastronomia Local:</strong> Degustação de pratos típicos da região</li>
            </ul>
            <p>Descubra a história, cultura e belezas naturais de cada destino com total segurança e conforto!</p>
        `,
    },
    local: {
        title: "Redescubra Sua Cidade",
        content: `
            <h2>Sua Cidade Tem Segredos</h2>
            <p>Mesmo morando há anos no mesmo lugar, sempre há algo novo para descobrir:</p>
            <ul>
                <li><strong>História Local:</strong> Conheça fatos históricos que você nunca soube</li>
                <li><strong>Arquitetura:</strong> Descubra detalhes arquitetônicos únicos</li>
                <li><strong>Cultura Popular:</strong> Tradições e costumes locais</li>
                <li><strong>Gastronomia Escondida:</strong> Restaurantes e lanchonetes tradicionais</li>
                <li><strong>Arte Urbana:</strong> Murais, grafites e instalações artísticas</li>
                <li><strong>Natureza Urbana:</strong> Parques e áreas verdes pouco conhecidas</li>
            </ul>
            <p>Torne-se um verdadeiro conhecedor da sua própria cidade com nossos tours locais especializados!</p>
        `,
    },
    transport: {
        title: "Transporte Executivo",
        content: `
            <h2>Viaje com Conforto e Tranquilidade</h2>
            <p>Para quem busca apenas o transporte, sem a parte turística:</p>
            <ul>
                <li><strong>Transfers Aeroporto:</strong> Pontualidade garantida para voos</li>
                <li><strong>Viagens Corporativas:</strong> Transporte para reuniões e eventos</li>
                <li><strong>Corridas Urbanas:</strong> Alternativa premium aos apps tradicionais</li>
                <li><strong>Viagens Intermunicipais:</strong> Conforto para longas distâncias</li>
                <li><strong>Motoristas Profissionais:</strong> Treinados e uniformizados</li>
                <li><strong>Veículos Premium:</strong> Frota moderna e bem conservada</li>
            </ul>
            <p>Ideal para executivos, famílias e todos que valorizam pontualidade, segurança e conforto!</p>
        `,
    },
}

serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
        const service = card.getAttribute("data-service")
        const info = serviceInfo[service]
        modalContent.innerHTML = info.content
        modal.style.display = "block"
    })
})

closeModal.addEventListener("click", () => {
    modal.style.display = "none"
})

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none"
    }
})

// Reviews System
const tabButtons = document.querySelectorAll(".tab-button")
const tabContents = document.querySelectorAll(".tab-content")

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab")

        // Remove active class from all tabs
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))

        // Add active class to clicked tab
        button.classList.add("active")
        document.getElementById(tabId).classList.add("active")
    })
})

// Star Rating System - Versão corrigida
function setupStarRating(container) {
    const stars = container.querySelectorAll(".stars i")
    let rating = 0

    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            rating = index + 1
            updateStars(stars, rating)
            // Armazenar o rating no container para recuperar depois
            container.setAttribute("data-rating", rating)
        })

        star.addEventListener("mouseover", () => {
            updateStars(stars, index + 1)
        })
    })

    container.addEventListener("mouseleave", () => {
        updateStars(stars, rating)
    })

    return () => rating
}

function updateStars(stars, rating) {
    stars.forEach((star, index) => {
        star.classList.remove("active")
        if (index < rating) {
            star.classList.add("active")
        }
    })
}

// Setup star ratings for both forms
const clientRatingContainer = document.querySelector("#client-reviews .rating")
const employeeRatingContainer = document.querySelector("#employee-reviews .rating")

const getClientRating = setupStarRating(clientRatingContainer)
const getEmployeeRating = setupStarRating(employeeRatingContainer)

// Reviews Storage
let clientReviews = JSON.parse(localStorage.getItem("clientReviews")) || []
let employeeReviews = JSON.parse(localStorage.getItem("employeeReviews")) || []

// Display Reviews
function displayReviews() {
    displayClientReviews()
    displayEmployeeReviews()
}

function displayClientReviews() {
    const container = document.getElementById("clientReviewsList")
    container.innerHTML = ""

    clientReviews.forEach((review) => {
        const reviewElement = createReviewElement(review)
        container.appendChild(reviewElement)
    })
}

function displayEmployeeReviews() {
    const container = document.getElementById("employeeReviewsList")
    container.innerHTML = ""

    employeeReviews.forEach((review) => {
        const reviewElement = createReviewElement(review, true)
        container.appendChild(reviewElement)
    })
}

function createReviewElement(review, isEmployee = false) {
    const div = document.createElement("div")
    div.className = "review-item"

    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating)

    div.innerHTML = `
        <div class="review-header">
            <div class="review-name">${review.name}${isEmployee ? ` - Funcionário: ${review.employee}` : ""}</div>
            <div class="review-rating">${stars}</div>
        </div>
        <div class="review-text">${review.comment}</div>
        <div class="review-date">${new Date(review.date).toLocaleDateString("pt-BR")}</div>
    `

    return div
}

// Corrigir formulários de avaliação
document.getElementById("clientReviewForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const name = e.target.querySelector('input[type="text"]').value
    const comment = e.target.querySelector("textarea").value
    const ratingContainer = e.target.querySelector(".rating")
    const rating = Number.parseInt(ratingContainer.getAttribute("data-rating")) || 0

    if (rating === 0) {
        alert("Por favor, selecione uma avaliação!")
        return
    }

    const review = {
        name,
        comment,
        rating,
        date: new Date().toISOString(),
    }

    clientReviews.unshift(review)
    localStorage.setItem("clientReviews", JSON.stringify(clientReviews))

    displayClientReviews()
    e.target.reset()
    ratingContainer.setAttribute("data-rating", "0")
    updateStars(ratingContainer.querySelectorAll(".stars i"), 0)

    alert("Avaliação enviada com sucesso!")
})

document.getElementById("employeeReviewForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const inputs = e.target.querySelectorAll('input[type="text"]')
    const employee = inputs[0].value
    const name = inputs[1].value
    const comment = e.target.querySelector("textarea").value
    const ratingContainer = e.target.querySelector(".rating")
    const rating = Number.parseInt(ratingContainer.getAttribute("data-rating")) || 0

    if (rating === 0) {
        alert("Por favor, selecione uma avaliação!")
        return
    }

    const review = {
        employee,
        name,
        comment,
        rating,
        date: new Date().toISOString(),
    }

    employeeReviews.unshift(review)
    localStorage.setItem("employeeReviews", JSON.stringify(employeeReviews))

    displayEmployeeReviews()
    e.target.reset()
    ratingContainer.setAttribute("data-rating", "0")
    updateStars(ratingContainer.querySelectorAll(".stars i"), 0)

    alert("Avaliação enviada com sucesso!")
})

// Initialize reviews display
displayReviews()

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
        navbar.style.background = "linear-gradient(to right, rgba(26, 42, 58, 0.95), rgba(44, 62, 80, 0.95))"
        navbar.style.backdropFilter = "blur(10px)"
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)"
    } else {
        navbar.style.background = "linear-gradient(to right, #1a2a3a, #2c3e50)"
        navbar.style.backdropFilter = "none"
        navbar.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.2)"
    }
})

// Adicionar efeito de destaque ao item de menu ativo durante o scroll
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-menu a")

    let current = ""

    sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight

        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute("id")
        }
    })

    navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active")
        }
    })
})

// Add some sample reviews if none exist
if (clientReviews.length === 0) {
    clientReviews = [
        {
            name: "Maria Silva",
            comment:
                "Excelente serviço! O tour pela cidade foi incrível, o guia muito conhecedor e o transporte muito confortável.",
            rating: 5,
            date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            name: "João Santos",
            comment: "Muito bom! Recomendo para quem quer conhecer lugares novos com segurança e conforto.",
            rating: 4,
            date: new Date(Date.now() - 172800000).toISOString(),
        },
    ]
    localStorage.setItem("clientReviews", JSON.stringify(clientReviews))
}

if (employeeReviews.length === 0) {
    employeeReviews = [
        {
            employee: "Carlos Motorista",
            name: "Ana Costa",
            comment: "Motorista muito educado e pontual. Dirigiu com muita segurança durante toda a viagem.",
            rating: 5,
            date: new Date(Date.now() - 86400000).toISOString(),
        },
    ]
    localStorage.setItem("employeeReviews", JSON.stringify(employeeReviews))
}

displayReviews()

// Botão "Comece sua Viagem" funcional
document.addEventListener("DOMContentLoaded", () => {
    const ctaButton = document.querySelector(".cta-button")
    const contactModal = document.getElementById("contactModal")

    if (ctaButton) {
        ctaButton.addEventListener("click", () => {
            contactModal.style.display = "block"
        })
    }
})

// Contact Modal
const contactModal = document.getElementById("contactModal")
const closeContactModal = document.querySelector(".close-contact")

if (closeContactModal) {
    closeContactModal.addEventListener("click", () => {
        contactModal.style.display = "none"
    })
}

window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
        contactModal.style.display = "none"
    }
})

// Funções para contato
function callPhone() {
    window.location.href = "tel:+5511999999999"
}

function sendWhatsApp() {
    window.open("https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os serviços da TourPlus.", "_blank")
}

function sendEmail() {
    window.location.href = "mailto:contato@tourplus.com?subject=Interesse nos serviços TourPlus"
}

// Inicializar mapa quando a página carregar
window.addEventListener("load", () => {
    // Tentar carregar Leaflet (OpenStreetMap)
    if (typeof L === "undefined") {
        const leafletCSS = document.createElement("link")
        leafletCSS.rel = "stylesheet"
        leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(leafletCSS)

        const leafletJS = document.createElement("script")
        leafletJS.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        leafletJS.onload = initMap
        leafletJS.onerror = showMapFallback
        document.head.appendChild(leafletJS)
    } else {
        initMap()
    }
})
