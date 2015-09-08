$(function(){
	var datepicker = datepicker || {};
	datepicker.init = function() {
		var self = this;
		self.month;
		self.year;
		self.day;
		self.selected = {};
		
		self.getOffset = function(month, year) { //get day that month starts on
			return new Date(year + "-" + month + "-01").getDay();
		}
		
		self.getDaysInMonth = function(month, year) { 
			return new Date(year, month, 0).getDate();//javascript month is zero indexed
		}
		
		self.setMonth = function(month, year) {
			self.month = month;
			self.year = year;
			self.selected = {};
			var obj = new Date(year, month, 1);
			var days = "";
			var spaces =0;
			console.log(self.selected);
			for(var i=0;i<obj.getDay();++i) {
				days+="<div class='dp-spacer'></div>";
				spaces++;
			}
			for(var i=1;i<=self.getDaysInMonth(month,year);++i) {
				days+="<div class='dp-spacer dp-day ";
				if(month==self.selected.month && year==self.selected.year && i == self.selected.day) {
					days+='dp-selected-day';
				}
				days+="'>"+i+"</div>";
				spaces++;
			}
			
			$(".dp-month").fadeOut(250,function(){
				$(".dp-month").text(obj.toLocaleString('en-us', {month:'long'}));
				$(".dp-month").fadeIn(250);
			});
			
			$(".dp-days").fadeOut(250, function(){
				$(".dp-days").html(days);			
				$(".dp-days").fadeIn(250);
			});
		}
		
		self.setDate = function(day) {
			self.selected.day = day;
			self.selected.month = self.month;
			self.selected.year = self.year;
			console.log(self.selected);
		}
		
		$(".dp-right").click(function(){
			self.month+=1;
			if(self.month==12) {
				self.month=0;
				self.year+=1;
			}
			self.setMonth(self.month, self.year);
		});
		
		$(".dp-left").click(function(){
			self.month-=1;
			if(self.month==-1) {
				self.month=11;
				self.year-=1;
			}
			self.setMonth(self.month, self.year);
		});
		
		$(".dp-container").on('click','.dp-day', function(){
			$(".dp-selected-day").removeClass("dp-selected-day");
			$(this).addClass("dp-selected-day");
			self.setDate(parseInt($(this).text()));
		});
		
		return self;
	}
	
	var dp = datepicker.init();
	dp.setMonth(0,2015);
});

