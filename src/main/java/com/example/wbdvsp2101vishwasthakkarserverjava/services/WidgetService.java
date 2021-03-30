package com.example.wbdvsp2101vishwasthakkarserverjava.services;

import com.example.wbdvsp2101vishwasthakkarserverjava.models.Widget;
import com.example.wbdvsp2101vishwasthakkarserverjava.repositories.WidgetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    // implement crud operations
    public Widget createWidgetForTopic(String tid, Widget widget) {
        widget.setTopicId(tid);
        return repository.save(widget);
    }
    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
    }
    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }
    public Widget findWidgetById(Long id) {
        return repository.findById(id).get();
    }

    // TODO: Override assignment operator for widget class
    public Integer updateWidget(Long id, Widget newWidget) {
        Widget widget = findWidgetById(id);
        widget.setText(newWidget.getText());
        widget.setType(newWidget.getType());
        widget.setSize(newWidget.getSize());
        widget.setListType(newWidget.getListType());
        widget.setWidth(newWidget.getWidth());
        widget.setHeight(newWidget.getHeight());
        widget.setUrl(newWidget.getUrl());
        repository.save(widget);
        return 1;
    }

    public Integer deleteWidget(Long id) {
        repository.deleteById(id);
        return 1;
    }
}
