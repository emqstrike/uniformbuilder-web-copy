$(document).ready(function() {

    ub.cPoint = function cPoint(x,y) {
       this.x=x;
       this.y=y;
    }

    // Contour object
    ub.Contour = function Contour(a) {
        this.pts = []; // an array of Point objects defining the contour
    }

    ub.Contour.prototype.area = function() {
       var area=0;
       var pts = this.pts;
       var nPts = pts.length;
       var j=nPts-1;
       var p1; var p2;

       for (var i=0;i<nPts;j=i++) {
          p1=pts[i]; p2=pts[j];
          area+=p1.x*p2.y;
          area-=p1.y*p2.x;
       }
       area/=2;
       return area;
    };

    ub.Contour.prototype.centroid = function() {
       var pts = this. pts;
       var nPts = pts.length;
       var x=0; var y=0;
       var f;
       var j=nPts-1;
       var p1; var p2;

       for (var i=0;i<nPts;j=i++) {
          p1=pts[i]; p2=pts[j];
          f=p1.x*p2.y-p2.x*p1.y;
          x+=(p1.x+p2.x)*f;
          y+=(p1.y+p2.y)*f;
       }

       f=this.area()*6;
       return new ub.cPoint({x: x/f,y:y/f});
    };

});