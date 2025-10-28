// Cosmic Analytics - Dashboard de Analytics Futurista
class CosmicAnalytics {
    constructor() {
        this.charts = {};
        this.currentTheme = 'dark';
        this.currentTimeRange = 'month';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.initParticles();
        this.loadSampleData();
        this.initCharts();
        this.startRealTimeUpdates();
        console.log('📊 Cosmic Analytics inicializado');
    }

    // Configurar event listeners
    setupEventListeners() {
        // Toggle tema
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Refresh datos
        document.getElementById('refreshData').addEventListener('click', () => {
            this.refreshData();
        });

        // Exportar reporte
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportReport();
        });

        // Cambio de rango de tiempo
        document.getElementById('timeRange').addEventListener('change', (e) => {
            this.currentTimeRange = e.target.value;
            this.updateCharts();
        });

        // Búsqueda en tabla
        document.getElementById('dataSearch').addEventListener('input', (e) => {
            this.filterTable(e.target.value);
        });

        // Toggle tipo de gráfico
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartType = e.target.dataset.chart;
                this.toggleChartType('salesChart', chartType);
                
                // Actualizar botones activos
                document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    // Cargar datos de ejemplo épicos
    loadSampleData() {
        this.sampleData = {
            sales: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                data: [12000, 19000, 15000, 25000, 22000, 30000]
            },
            traffic: {
                labels: ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'],
                data: [35, 25, 20, 15, 5]
            },
            devices: {
                labels: ['Móvil', 'Tablet', 'Desktop', 'Otros'],
                data: [45, 15, 35, 5]
            },
            performance: {
                labels: ['Velocidad', 'Disponibilidad', 'Seguridad', 'UX'],
                data: [85, 95, 90, 88]
            },
            sources: {
                labels: ['Directo', 'Social', 'Email', 'Búsqueda', 'Referidos'],
                data: [30, 25, 20, 15, 10]
            },
            realTimeData: [
                {
                    user: 'usuario_quantum',
                    activity: 'Compra completada',
                    device: 'Móvil',
                    location: 'Madrid, ES',
                    time: 'Hace 2 min',
                    status: 'active'
                },
                {
                    user: 'cliente_galaxia',
                    activity: 'Página vista',
                    device: 'Desktop',
                    location: 'Barcelona, ES',
                    time: 'Hace 5 min',
                    status: 'active'
                },
                {
                    user: 'explorador_nebula',
                    activity: 'Registro completado',
                    device: 'Tablet',
                    location: 'Valencia, ES',
                    time: 'Hace 8 min',
                    status: 'active'
                },
                {
                    user: 'viajero_estelar',
                    activity: 'Carrito abandonado',
                    device: 'Móvil',
                    location: 'Sevilla, ES',
                    time: 'Hace 12 min',
                    status: 'inactive'
                },
                {
                    user: 'navegante_cosmico',
                    activity: 'Producto visto',
                    device: 'Desktop',
                    location: 'Bilbao, ES',
                    time: 'Hace 15 min',
                    status: 'active'
                }
            ]
        };

        this.updateRealTimeTable();
    }

    // Inicializar gráficos con Chart.js
    initCharts() {
        this.initSalesChart();
        this.initTrafficChart();
        this.initDevicesChart();
        this.initPerformanceChart();
        this.initSourcesChart();
    }

    initSalesChart() {
        const ctx = document.getElementById('salesChart').getContext('2d');
        this.charts.sales = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.sampleData.sales.labels,
                datasets: [{
                    label: 'Ventas ($)',
                    data: this.sampleData.sales.data,
                    borderColor: '#00f5ff',
                    backgroundColor: 'rgba(0, 245, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00f5ff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(10, 10, 26, 0.9)',
                        titleColor: '#00f5ff',
                        bodyColor: '#ffffff',
                        borderColor: '#00f5ff',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }

    initTrafficChart() {
        const ctx = document.getElementById('trafficChart').getContext('2d');
        this.charts.traffic = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.sampleData.traffic.labels,
                datasets: [{
                    data: this.sampleData.traffic.data,
                    backgroundColor: [
                        '#00f5ff',
                        '#b300ff',
                        '#ff00f7',
                        '#00ff88',
                        '#ff6b35'
                    ],
                    borderWidth: 2,
                    borderColor: '#0a0a1a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }

    initDevicesChart() {
        const ctx = document.getElementById('devicesChart').getContext('2d');
        this.charts.devices = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.sampleData.devices.labels,
                datasets: [{
                    data: this.sampleData.devices.data,
                    backgroundColor: [
                        '#00f5ff',
                        '#b300ff',
                        '#ff00f7',
                        '#00ff88'
                    ],
                    borderWidth: 2,
                    borderColor: '#0a0a1a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }

    initPerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        this.charts.performance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.sampleData.performance.labels,
                datasets: [{
                    label: 'Rendimiento',
                    data: this.sampleData.performance.data,
                    backgroundColor: 'rgba(0, 245, 255, 0.2)',
                    borderColor: '#00f5ff',
                    borderWidth: 2,
                    pointBackgroundColor: '#00f5ff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            backdropColor: 'transparent'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    initSourcesChart() {
        const ctx = document.getElementById('sourcesChart').getContext('2d');
        this.charts.sources = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.sampleData.sources.labels,
                datasets: [{
                    label: 'Tráfico (%)',
                    data: this.sampleData.sources.data,
                    backgroundColor: '#00f5ff',
                    borderColor: '#00f5ff',
                    borderWidth: 1,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }

    // Actualizar gráficos cuando cambia el rango de tiempo
    updateCharts() {
        // Simular datos diferentes según el rango de tiempo
        const multipliers = {
            today: 0.1,
            week: 0.3,
            month: 1,
            quarter: 3,
            year: 12
        };

        const multiplier = multipliers[this.currentTimeRange] || 1;

        // Actualizar datos de ventas
        this.charts.sales.data.datasets[0].data = this.sampleData.sales.data.map(
            value => Math.round(value * multiplier)
        );
        this.charts.sales.update();

        // Mostrar loading
        this.showLoading();
        
        // Simular carga de datos
        setTimeout(() => {
            this.hideLoading();
        }, 1000);
    }

    // Cambiar tipo de gráfico
    toggleChartType(chartId, type) {
        if (this.charts.sales) {
            this.charts.sales.destroy();
            
            if (type === 'line') {
                this.initSalesChart();
            } else if (type === 'bar') {
                this.convertToBarChart();
            }
        }
    }

    convertToBarChart() {
        const ctx = document.getElementById('salesChart').getContext('2d');
        this.charts.sales = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.sampleData.sales.labels,
                datasets: [{
                    label: 'Ventas ($)',
                    data: this.sampleData.sales.data,
                    backgroundColor: '#00f5ff',
                    borderColor: '#00f5ff',
                    borderWidth: 1,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }

    // Actualizar tabla de datos en tiempo real
    updateRealTimeTable() {
        const tbody = document.getElementById('dataTableBody');
        tbody.innerHTML = this.sampleData.realTimeData.map(item => `
            <tr>
                <td>${item.user}</td>
                <td>${item.activity}</td>
                <td>${item.device}</td>
                <td>${item.location}</td>
                <td>${item.time}</td>
                <td>
                    <span class="status-badge ${item.status === 'active' ? 'status-active' : 'status-inactive'}">
                        ${item.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
            </tr>
        `).join('');
    }

    // Filtrar tabla
    filterTable(searchTerm) {
        const rows = document.querySelectorAll('#dataTableBody tr');
        const term = searchTerm.toLowerCase();

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    }

    // Sistema de temas
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('cosmicTheme', this.currentTheme);
        
        // Actualizar gráficos para el nuevo tema
        this.updateChartsForTheme();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('cosmicTheme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.body.setAttribute('data-theme', this.currentTheme);
        }
    }

    updateChartsForTheme() {
        // Los gráficos de Chart.js se actualizan automáticamente
        // cuando cambia el tema porque usan colores CSS variables
        Object.values(this.charts).forEach(chart => {
            chart.update();
        });
    }

    // Refresh datos
    refreshData() {
        this.showLoading();
        
        // Simular carga de nuevos datos
        setTimeout(() => {
            // Generar datos aleatorios para demostración
            this.sampleData.sales.data = this.sampleData.sales.data.map(
                () => Math.floor(Math.random() * 30000) + 10000
            );
            
            this.updateCharts();
            this.hideLoading();
            
            // Mostrar notificación
            this.showNotification('Datos actualizados correctamente', 'success');
        }, 1500);
    }

    // Exportar reporte
    exportReport() {
        this.showLoading();
        
        // Simular exportación
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Reporte exportado como PDF', 'success');
            
            // Crear y descargar un PDF simulado
            const link = document.createElement('a');
            link.href = '#';
            link.download = `cosmic-analytics-report-${new Date().toISOString().split('T')[0]}.pdf`;
            link.click();
        }, 2000);
    }

    // Actualizaciones en tiempo real
    startRealTimeUpdates() {
        // Simular actualizaciones en tiempo real cada 30 segundos
        setInterval(() => {
            this.updateRealTimeData();
        }, 30000);
    }

    updateRealTimeData() {
        // Añadir nuevo dato aleatorio
        const activities = ['Página vista', 'Producto visto', 'Registro completado', 'Compra completada', 'Carrito abandonado'];
        const devices = ['Móvil', 'Desktop', 'Tablet'];
        const locations = ['Madrid, ES', 'Barcelona, ES', 'Valencia, ES', 'Sevilla, ES', 'Bilbao, ES'];
        const users = ['usuario_', 'cliente_', 'explorador_', 'viajero_', 'navegante_'];
        
        const newData = {
            user: users[Math.floor(Math.random() * users.length)] + Math.floor(Math.random() * 1000),
            activity: activities[Math.floor(Math.random() * activities.length)],
            device: devices[Math.floor(Math.random() * devices.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            time: 'Hace 1 min',
            status: Math.random() > 0.2 ? 'active' : 'inactive'
        };

        // Añadir al principio y mantener solo los últimos 5
        this.sampleData.realTimeData.unshift(newData);
        this.sampleData.realTimeData = this.sampleData.realTimeData.slice(0, 5);
        
        this.updateRealTimeTable();
    }

    // Utilidades de UI
    showLoading() {
        document.getElementById('loadingOverlay').classList.add('active');
    }

    hideLoading() {
        document.getElementById('loadingOverlay').classList.remove('active');
    }

    showNotification(message, type = 'success') {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--quantum-green)' : 'var(--quantum-pink)'};
            color: var(--deep-space);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1002;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Partículas de fondo
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: "#00f5ff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.3, random: true },
                    size: { value: 2, random: true },
                    line_linked: {
                        enable: true,
                        distance: 120,
                        color: "#b300ff",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                }
            });
        }
    }
}

// Inicializar el dashboard cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.analytics = new CosmicAnalytics();
});