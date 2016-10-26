import Stats from 'stats-js'

export default class Statistics {
    
    constructor(){
        this.stats = new Stats()
        this.setPerformanceStatistics()
    }

    setPerformanceStatistics(){
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        document.body.appendChild(this.stats.domElement)
    }

    begin(){
        this.stats.begin();
    }

    end(){
        this.stats.end();
    }
}