import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';
import { MappingProfilesService } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { DiagramCategoryService } from '../../services/diagram-category-service/diagram-category.service';
import { TabActivationStatusService } from '../../services/tab-activation-status-service/tab-activation-status.service';

@Component({
  selector: 'head-menu-widget',
  templateUrl: './head-menu-widget.component.html',
  styleUrls: ['./head-menu-widget.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadMenuWidgetComponent extends ObjectLayoutWidget implements OnInit {

  constructor(public mappingProfileService: MappingProfilesService,
              public diagramCategoryService: DiagramCategoryService,
              public tabActivationStatusService: TabActivationStatusService) {
    super();
  }

  ngOnInit() {}
}
