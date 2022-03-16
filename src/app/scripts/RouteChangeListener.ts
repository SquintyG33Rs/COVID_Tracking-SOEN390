// This class has the task of keeping track of which page we are currently on using the router event listener
import { EventEmitter } from "@angular/core";
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { User } from "../entities/User";

export class MyServiceEvent 
{
  message: string;
}


export class RouteChangeDetection
{
  currentRouteURL:string;
  singleton:RouteChangeDetection;
  public onChange: EventEmitter<MyServiceEvent> = new EventEmitter<MyServiceEvent>();
  
  constructor(private router: Router)
  {

    if(this.singleton != null) 
    {
      return;
    }

    else 
    {
      this.singleton = this;
    }

    // Detect route change
    this.router.events.subscribe((event: Event) => 
    {
      this.currentRouteURL = "";

      if (event instanceof NavigationStart) 
      {
        // Show progress spinner or progress bar
        console.log('Route change detected from LISTENER');
      }

      if (event instanceof NavigationEnd) 
      {
        this.currentRouteURL = event.url; 
        console.log(event);
        this.sendEvent(event.url);
      }

      if (event instanceof NavigationError) 
      {
        // Hide progress spinner or progress bar
        // Present error to user
        console.log(event.error);
      }
    });
  }

  sendEvent(message)
  {
    this.onChange.emit({message});
  }
}